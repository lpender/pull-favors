// Generated by CoffeeScript 1.7.1
(function() {
  var File, FileManager, fileParent, init, tocParent,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  fileParent = "#files";

  tocParent = "#toc ol";

  File = (function() {
    File.prototype.fileName = null;

    function File(selector, index) {
      this.setOrder = __bind(this.setOrder, this);
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
      return this.fileName.indexOf("_spec.") > 0;
    };

    File.prototype.isFeatureSpec = function() {
      return this.isSpec() && this.fileName.indexOf("feature") > 0;
    };

    File.prototype.setOrder = function(index) {
      this.$parent.css("order", index);
      return this.$tocElement.css("order", index);
    };

    return File;

  })();

  FileManager = (function() {
    function FileManager() {
      this.sort = __bind(this.sort, this);
      this.$parent = $(fileParent);
      this.$tocParent = $(tocParent);
      this.files = this._initFiles(fileParent);
      this._setStyles();
    }

    FileManager.prototype.sort = function(fileName) {
      var fileNames, fileSpecs, finalOrder;
      fileNames = [];
      this.files.each(function(index, file) {
        var simpleName;
        fileName = file.fileName;
        simpleName = fileName.split(".")[0];
        simpleName = simpleName.split("/");
        simpleName = simpleName[simpleName.length - 1];
        return fileNames.push(simpleName);
      });
      fileSpecs = fileNames.map(function(fileName, index) {
        return fileNames.indexOf(fileName + "_spec");
      });
      finalOrder = [];
      this.files.each((function(_this) {
        return function(index, file) {
          var spec;
          if (file.isFeatureSpec()) {
            finalOrder.unshift(file);
          }
          if (!file.isSpec()) {
            finalOrder.push(file);
          }
          if (fileSpecs[index] > 0) {
            spec = _this.files[fileSpecs[index]];
            return finalOrder.push(spec);
          }
        };
      })(this));
      return finalOrder.forEach((function(_this) {
        return function(file, index) {
          var newIndex;
          newIndex = index + 1;
          return file.setOrder(newIndex);
        };
      })(this));
    };

    FileManager.prototype._initFiles = function(selector) {
      return $(selector + "> div:not(.file-wrapper)").map(function(index, fileSelector) {
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

  init = function() {
    window.PullFavors = new FileManager();
    return window.PullFavors.sort();
  };

  setInterval(init, 500);

  init();

}).call(this);
