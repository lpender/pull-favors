fileParent = "#files.diff-view"
tocParent = "#toc ol"

class File
  fileName: null,
  order: null,

  constructor: (selector, index) ->
    @$element = $(selector)
    anchor = @$element.prev()
    @$tocElement = $(tocParent).find("> li:eq("+index+")")

    @$merger = @$element.add anchor

    @_wrapAll()
    @_setFileName()

  _setFileName: ->
    header = @$element.find(".file-header")
    @fileName = header.data("path")

  _wrapAll: ->
    @$merger.wrapAll "<div class=\"file-wrapper\"/>"
    @$parent = @$element.parent(".file-wrapper")

  isSpec: ->
    @fileName.indexOf("spec") > -1

  isFeatureSpec: ->
    @isSpec() && @fileName.indexOf("spec/features") > -1

  setOrder: (index) =>
    @order = index
    @$parent.css("order", index)
    @$tocElement.css("order", index)

class FileManager
  constructor: ->
    @$parent = $(fileParent)
    @$tocParent = $(tocParent)

    @files = @_initFiles(fileParent)
    @_setStyles()

  sort: (fileName) =>
    fileNames = []

    @files.each (index, file) ->
      fileName = file.fileName
      simpleName = fileName.split(".")[0]
      simpleName = simpleName.split("/")
      simpleName = simpleName[simpleName.length-1]

      fileNames.push simpleName

    fileSpecs = fileNames.map (fileName, index) ->
      fileNames.indexOf(fileName + "_spec")

    finalOrder = []

    # order orderable files
    @files.each (index, file) =>
      if file.isFeatureSpec()
        finalOrder.unshift file

      unless file.isSpec()
        finalOrder.push file

      if fileSpecs[index] > 0
        spec = @files[fileSpecs[index]]
        finalOrder.push spec

    finalOrder.forEach (file, index) =>
      file.setOrder index

    # cleanup leftover files
    @files.each (index, file) ->
      if file.order == null
        finalOrder.push file
        file.setOrder finalOrder.length - 1

  _initFiles: (selector) ->
    $(selector + "> div:not(.file-wrapper)").map (index, fileSelector) ->
      new File fileSelector, index

  _setStyles: () ->
    options =
      "display": "flex",
      "flex-direction": "column"
    @$parent.css options
    @$tocParent.css options

init = ->
  window.PullFavors = new FileManager()
  window.PullFavors.sort()

setInterval init, 500

init()
