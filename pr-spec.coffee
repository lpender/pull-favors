class File
  fileName: null,

  constructor: (selector, index) ->
    @$element = $(selector)
    anchor = @$element.prev()

    @$merger = @$element.add anchor

    @_wrapAll()
    @_setFileName()

  _setFileName: ->
    header = @$element.find(".file-header")
    @fileName = header.data("path")

  _wrapAll: ->
    @$merger.wrapAll "<div class='file-wrapper'/>"
    @$parent = @$element.parent(".file-wrapper")

  isSpec: ->
    @fileName.indexOf("_spec") > 0

  isFeatureSpec: ->
    @isSpec() && @fileName.indexOf("feature") > 0

  setOrder: (index) =>
    @$parent.css("order", index)

class FileManager
  constructor: (selector) ->
    @$parent = $(selector)

    @files = @_initFiles(selector)
    @$parent.css(
      'display': 'inline-flex',
      'flex-direction': 'column'
    )

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

  _initFiles: (selector) ->
    $(selector + "> div").map (index, fileSelector) ->
      new File fileSelector, index

FM = new FileManager "#files"
FM.sort()
