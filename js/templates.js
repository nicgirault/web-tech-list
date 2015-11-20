angular.module("app.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!DOCTYPE html><html lang=\"en\" ng-app=\"webTechList\"><head><title>Web Tech List</title><meta charset=\"utf-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"stylesheet\" href=\"css/vendor.css\"><link rel=\"stylesheet\" href=\"css/app.css\"></head><body><main ui-view class=\"container\"></main><script src=\"js/vendor.js\"></script><script src=\"js/templates.js\"></script><script src=\"js/app.js\"></script><script>(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');ga(\'create\', \'UA-43030728-4\', \'auto\');</script></body></html>");
$templateCache.put("home/states/newTechnology/view.html","<div class=\"container\"><form name=\"form\"><div ng-class=\"{ \'has-error\' : form.title.$invalid &amp;&amp; ! form.title.$pristine }\" class=\"form-group\"><label>Technology name</label><input type=\"text\" ng-model=\"technology.title\" name=\"title\" autofocus technology-blacklist required class=\"form-control\"><div ng-messages=\"form.title.$error\" role=\"alert\" class=\"error-messages\"><div ng-message=\"technology-blacklist\">This technology already exists</div><div ng-message=\"required\" ng-if=\"!form.title.$pristine\">This field is required</div></div></div><div class=\"form-group\"><label>Logo URL</label><input ng-model=\"technology.logoUrl\" class=\"form-control\"><img ng-src=\"{{technology.logoUrl}}\" ng-if=\"technology.logoUrl\" class=\"logo\"></div><div class=\"form-group\"><label>Technology tags</label><tags-input ng-model=\"technology.tags\" display-property=\"label\" on-tag-adding=\"addTag($tag)\"><auto-complete source=\"autocomplete($query)\" min-length=\"1\"></auto-complete></tags-input></div><button ng-click=\"save()\" ng-disabled=\"form.$invalid\" class=\"new-technology-submit btn btn-primary\">Save</button></form></div>");
$templateCache.put("home/states/technology/view.html","<h1>{{ technology.title }}</h1><tags-input ng-model=\"technology.tags\" display-property=\"label\" on-tag-adding=\"addTag($tag)\" on-tag-removed=\"save()\"></tags-input><div class=\"form-group\"><label>Logo Url</label><input ng-model=\"technology.logoUrl\" ng-blur=\"save()\" class=\"form-control\"></div><img ng-src=\"{{technology.logoUrl}}\">");
$templateCache.put("home/states/technologyList/view.html","<h1>List of web technologies</h1><input type=\"text\" ng-model=\"tags\" class=\"form-control\"><hr><div ng-repeat=\"technology in technologies | filterByTags:tags\" class=\"panel panel-default\"><div class=\"panel-heading\"><h4><a ui-sref=\"technology({id: technology.objectId})\">{{ technology.title }}</a></h4><table class=\"vote\"><tr><td class=\"thumbsUp\"><span ng-click=\"vote(technology, true)\" class=\"glyphicon glyphicon-thumbs-up\"></span><span class=\"badge\">{{ technology.thumbsUp || 0 }}</span></td><td class=\"thumbsDown\"><span ng-click=\"vote(technology, false)\" class=\"glyphicon glyphicon-thumbs-down\"></span><span class=\"badge\">{{ technology.thumbsDown || 0 }}</span></td></tr></table></div><div class=\"panel-body\"><img ng-src=\"{{technology.logoUrl}}\" class=\"logo\"><div><ul class=\"tag-cloud\"><li ng-repeat=\"tag in technology.tags\"><a href=\"#\">{{ tag.label }}</a></li></ul></div></div></div><div ui-sref=\"newTechnology\" class=\"new-technology btn-round\"><span class=\"glyphicon glyphicon-plus\"></span></div>");}]);