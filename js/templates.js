angular.module("app.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!DOCTYPE html><html lang=\"en\" ng-app=\"webTechList\"><head><title>Web Tech List</title><meta charset=\"utf-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"stylesheet\" href=\"css/vendor.css\"><link rel=\"stylesheet\" href=\"css/app.css\"></head><body><main ui-view class=\"container\"></main><script src=\"js/vendor.js\"></script><script src=\"js/templates.js\"></script><script src=\"js/app.js\"></script><script>(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');ga(\'create\', \'UA-43030728-4\', \'auto\');</script></body></html>");
$templateCache.put("home/directives/expanding-box/expanding-box.html","<div class=\"col-xs-12 col-md-2 panel panel-default\"><div class=\"panel-heading\"><h4>{{ technology.title }}</h4></div><div class=\"panel-body\"><img ng-src=\"{{ technology.logoUrl }}\" class=\"img-responsive logo\"></div></div>");
$templateCache.put("home/states/newTechnology/view.html","<div class=\"container\"><form name=\"form\"><div ng-class=\"{ \'has-error\' : form.title.$invalid &amp;&amp; !form.title.$pristine }\" class=\"form-group\"><label>Technology name</label><input type=\"text\" ng-model=\"technology.title\" name=\"title\" autofocus technology-blacklist required class=\"form-control\"><div ng-messages=\"form.title.$error\" role=\"alert\" class=\"error-messages\"><div ng-message=\"technology-blacklist\">This technology already exists</div><div ng-message=\"required\" ng-if=\"!form.title.$pristine\">This field is required</div></div></div><div class=\"form-group\"><label>Logo URL</label><input ng-model=\"technology.logoUrl\" class=\"form-control\"><img ng-src=\"{{technology.logoUrl}}\" ng-if=\"technology.logoUrl\" class=\"logo\"></div><div class=\"form-group\"><label>Technology tags</label><tags-input ng-model=\"technology.tags\" display-property=\"label\" on-tag-adding=\"addTag($tag)\"><auto-complete source=\"autocomplete($query)\" min-length=\"1\"></auto-complete></tags-input></div><button ng-click=\"save()\" ng-disabled=\"form.$invalid\" class=\"new-technology-submit btn btn-primary\">Save</button></form></div>");
$templateCache.put("home/states/technology/view.html","<div class=\"row\"><div class=\"col-xs-12 record\"><h2>{{ technology.title }}<div ui-sref=\"technologies\" class=\"cross pull-right fa fa-close\"></div><div ng-click=\"delete()\" class=\"delete pull-right fa fa-trash\"></div></h2><tags-input ng-model=\"technology.tags\" display-property=\"label\" on-tag-adding=\"addTag($tag)\" on-tag-removed=\"save()\"><auto-complete source=\"autocomplete($query)\" min-length=\"1\"></auto-complete></tags-input><div class=\"form-group\"><label>Logo Url</label><input ng-model=\"technology.logoUrl\" ng-blur=\"save()\" class=\"form-control\"></div><img ng-src=\"{{technology.logoUrl}}\"></div></div>");
$templateCache.put("home/states/technologyList/view.html","<h1>List of web technologies</h1><input type=\"text\" ng-model=\"tags\" class=\"form-control\"><hr><div class=\"container\"><div class=\"row\"><expanding-box ng-repeat=\"technology in technologies | filterByTags:tags\" technology=\"technology\"></expanding-box></div></div><div ui-sref=\"newTechnology\" class=\"new-technology btn-round\"><span class=\"glyphicon glyphicon-plus\"></span></div>");}]);