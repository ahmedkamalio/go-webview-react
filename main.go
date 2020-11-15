package main

import (
	"flag"
	"github.com/webview/webview"
	"os"
	"path"
	"runtime"
)

// jsCallbackExample is a callback function that can be executed
// from the JS runtime (as a global function), it takes arguments
// passed through JS and returns a value that will be resolved
// in the JS runtime as a Promise (async function).
func jsCallbackExample(msg string) (map[string]string, error) {
	print("\nJS Client says: ", msg, "\n\n")

	return map[string]string{
		"OS":         runtime.GOOS,
		"Arch":       runtime.GOARCH,
		"Compiler":   runtime.Compiler,
		"GO Version": runtime.Version(),
	}, nil
}

func main() {
	debug := flag.Bool("d", false, "Run in debug mode!")

	flag.Parse()

	w := webview.New(*debug)

	defer w.Destroy()

	w.SetTitle("Minimal webview example")
	w.SetSize(800, 600, webview.HintNone)

	cwd, err := os.Executable()
	if err != nil {
		panic(err.Error())
	}

	// if running in debug mode, navigate to the
	// webpack-dev-server, otherwise load the built files.
	if *debug {
		w.Navigate("http://localhost:5000")
	} else {
		w.Navigate(path.Join("file://", cwd, "../../fe/index.html"))
	}

	if err := w.Bind("jsCallbackExample", jsCallbackExample);
	err != nil {
		panic(err.Error())
	}

	w.Run()
}
