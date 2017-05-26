(function() {
  var File, FileManager, fileParent, init, tocParent,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  fileParent = ".js-diff-progressive-container";

  tocParent = "#toc ol";

  File = (function() {
    File.prototype.fileName = null;

    File.prototype.order = null;

    function File(selector, index) {
      this.setOrder = bind(this.setOrder, this);
      var anchor;
      this.$element = $(selector);
      anchor = this.$element.prev();
      this.$tocElement = $(tocParent).find("> li:eq(" + index + ")");
      this.$merger = this.$element.add(anchor);
      this._wrapAll();
      this._setFileName();
    }

    File.prototype._setFileName = function() {
      var header;
      header = this.$element.find(".file-header");
      return this.fileName = header.data("path");
    };

    File.prototype._wrapAll = function() {
      this.$merger.wrapAll("<div class=\"file-wrapper\"/>");
      return this.$parent = this.$element.parent(".file-wrapper");
    };

    File.prototype.isSpec = function() {
      return this.fileName.indexOf("spec") > -1;
    };

    File.prototype.isFeatureSpec = function() {
      return this.fileName.indexOf("spec/features") > -1;
    };

    File.prototype.setOrder = function(index) {
      this.order = index;
      this.$parent.css("order", index);

      // Add to the top most
      if (this.$parent.parent()[0] !== $(fileParent)[0]) {
        this.$parent.detach()
        $(fileParent)[0].appendChild(this.$parent[0])
      }

      return this.$tocElement.css("order", index);
    };

    return File;

  })();

  var files;

  FileManager = (function() {
    function FileManager() {
      this.sort = bind(this.sort, this);
      this.$parent = $(fileParent);
      this.$tocParent = $(tocParent);
      this._setStyles();
    }

    FileManager.prototype.getNewFiles = function () {
      var newFiles = this._initFiles(fileParent);

      if (newFiles && newFiles.length > 0) {
        if (files) {
          $.merge(files, newFiles);
        } else {
          files = newFiles;
        }
        this.sort();
      }
    }

    FileManager.prototype.sort = function() {
      var fileNames, fileSpecs, finalOrder;
      fileNames = [];
      files.each(function(index, file) {
        var extension, simpleName;
        fileName = file.fileName;
        simpleName = fileName.split(".")[0];
        extension = fileName.split(".")[1];
        simpleName = simpleName.split("/");
        simpleName.shift();
        return fileNames.push(simpleName.join("/"));
      });
      fileSpecs = fileNames.map(function(fileName, index) {
        return fileNames.indexOf(fileName + "_spec");
      });
      finalOrder = [];
      files.each((function(_this) {
        return function(index, file) {
          var spec;
          if (file.isFeatureSpec()) {
            finalOrder.unshift(file);
          }
          if (!file.isSpec()) {
            finalOrder.push(file);
          }
          if (fileSpecs[index] > 0) {
            spec = files[fileSpecs[index]];
            return finalOrder.push(spec);
          }
        };
      })(this));
      finalOrder.forEach((function(_this) {
        return function(file, index) {
          return file.setOrder(index);
        };
      })(this));
      return files.each(function(index, file) {
        if (file.order === null) {
          finalOrder.push(file);
          return file.setOrder(finalOrder.length - 1);
        }
      });
    };

    FileManager.prototype._initFiles = function(selector) {
      var $files = $(selector + " > .file");

      return $files.map(function(index, fileSelector) {
        return new File(fileSelector, index);
      });
    };

    FileManager.prototype._setStyles = function() {
      var options;
      options = {
        "display": "flex",
        "flex-direction": "column"
      };
      this.$parent.css(options);
      return this.$tocParent.css(options);
    };

    return FileManager;

  })();

  var pf = new FileManager();
  pf.getNewFiles()

  setInterval(function () {
    pf.getNewFiles()
  }, 500);
}).call(this);
