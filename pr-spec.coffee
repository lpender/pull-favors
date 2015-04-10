class File
  fileName: null,

  constructor: (selector, index) ->
    @$element = $(selector)
    anchor = @$element.prev()

    @$merger = @$element.add anchor

    @_wrapAll()
    @_setFileName()
    @_setOrder(index)

  _setFileName: ->
    header = @$element.find(".file-header")
    @fileName = header.data("path")

  _wrapAll: ->
    @$merger.wrapAll "<div class='file-wrapper'/>"
    @$parent = @$element.parent(".file-wrapper")

  _setOrder: (index) ->
    @$parent.css("order", index)

class FileManager
  constructor: (selector) ->
    @$parent = $(selector)

    files = $(selector + "> div").map (index, fileSelector) ->
    	new File fileSelector, index

    console.log files

new FileManager "#files"
