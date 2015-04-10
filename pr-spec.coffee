class File
  fileName: null,

  constructor: (selector, index) ->
    @$element = $(selector)
    anchor = @$element.prev()

    @$merger = @$element.add anchor

    @_wrapAll()
    @_setFileName()
    @setOrder(index)

  _setFileName: ->
    header = @$element.find(".file-header")
    @fileName = header.data("path")

  _wrapAll: ->
    @$merger.wrapAll "<div class='file-wrapper'/>"
    @$parent = @$element.parent(".file-wrapper")

  setOrder: (index) ->
    @$parent.css("order", index)

class FileManager
  constructor: (selector) ->
    @$parent = $(selector)

    @_initFiles(selector)
    @_initFileNames()

    console.log @_finalOrder

  _finalOrder: ->
    finalOrder = []

    @simpleNames.each (index, simpleName) =>

      # Push the index unless it's a spec
      unless @_isSpec simpleName
        finalOrder.push index

      # If it has a spec, push that index afterwards
      finalOrder.push @_specIndexFor simpleName

    finalOrder

  _initFiles: (selector) ->
    @files = $(selector + "> div").map (index, fileSelector) ->
    	new File fileSelector, index

  _initFileNames: ->
    @simpleNames = @files.map (index, file) =>
    	@_getSimpleName(file.fileName)

  _getSimpleName: (fileName) ->
    arr = fileName.split(".")[0]
    arr = arr.split('/')
    arr[arr.length-1]

  _isSpec: (fileName) ->
  	fileName.indexOf "_spec" > 0

  _specIndexFor: (fileName) ->
    index = @simpleNames.indexOf fileName + "_spec"

    if index
      index
    else
      null

new FileManager "#files"
