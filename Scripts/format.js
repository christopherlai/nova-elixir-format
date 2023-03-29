exports.run = (path, unformattedContent) => {
  let options = {
    args: ['mix', 'format', '-'],
    stdio: 'pipe',
  }

  if (path != null) {
      options.args.splice(2, 0, '--stdin-filename');
      options.args.splice(3, 0, path);
  }

  if (nova.workspace.path != null) {
      options.cwd = nova.workspace.path;
  }

  const process = new Process('/usr/bin/env', options);
  let error = '';
  let formattedContent = '';

  return new Promise((resolve, reject) => {
    const [stdin, stdout, stderr] = process.stdio;
    const writer = stdin.getWriter();

    writer.ready.then(() => {
      writer.write(unformattedContent);
    }).then(() => {
      writer.close();
    });

    process.onStdout(function (line) {
      formattedContent += line;
    });

    process.onStderr(function (line) {
      error += line;
      console.log("Error with mix format: " + line);
    });

    process.onDidExit(function (code) {
      if (code !== 0) {
        reject(error);
        return;
      } else {
        resolve(formattedContent);
      }
    });

    process.start();
  });
}
