app.directive 'expandingBox', ($timeout, $state) ->
  restrict: 'E'
  templateUrl: 'expanding-box.html'
  scope:
    technology: '='
  link: (scope, element, attrs) ->
    box = element.children()
    box.css 'background', "url('#{scope.technology.logoUrl}') no-repeat center"
    box.css 'background-size', "150px"

    element.on 'click', (event) ->
      box = element.children()
      newBox = box.clone()

      boxWidth = box.prop 'offsetWidth'
      boxHeight = box.prop 'offsetHeight'
      boxLeftOffset = box.prop 'offsetLeft'
      boxTopOffset = box.prop 'offsetTop'
      margin = 5 # TODO retrieve actual margin

      parent = element.parent()
      parent.append newBox

      body = angular.element(document).find 'body'
      bodyWidth = body.prop 'offsetWidth'
      bodyHeight = body.prop 'offsetHeight'
      parentOffsetLeft = parent.prop 'offsetLeft'
      parentOffsetTop = parent.prop 'offsetTop'

      leftTranslation = boxLeftOffset
      topTranslation = boxTopOffset

      box.css "border", "none"
      box.css "box-shadow", "none"

      newBox.empty()
      newBox.removeClass 'col-xs-2'
      newBox.addClass 'col-xs-12'
      newBox.css "background", "#fff"
      newBox.css "border", "none"
      newBox.css "box-shadow", "none"
      newBox.css "z-index", "100"

      newBox.css "position", "absolute"
      newBox.css "left", "#{boxLeftOffset-margin}px";
      newBox.css "top", "#{boxTopOffset-margin}px";

      newBox.css "z-index", "100"
      newBox.css "border", "none"
      newBox.css "width", "#{bodyWidth}px"
      newBox.css "height", "#{bodyHeight}px"
      newBox.css "transform", "translate(#{-leftTranslation}px,#{-topTranslation}px)"
      newBox.css "transition","all 1s"

      # we must wait for animation to end before changing state (maybe there is a better solution)
      $timeout ( ->
        $state.go 'technology', id: scope.technology.objectId
      ), 700
