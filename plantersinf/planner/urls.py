
from django.urls import include, path, re_path
from . import views

urlpatterns = [
    re_path(r'^$', views.index),
	re_path(r'^date/(?P<id>\d+)$', views.date),
	re_path(r'^date/(?P<id>\d+)/(?P<toggle>\d+)$', views.date),
	re_path(r'^create/$', views.create),
	re_path(r'^create/(?P<date>[-\w]+)$', views.create),
	re_path(r'^control/(?P<dateid>\d+)$', views.control),
	re_path(r'^control/(?P<dateid>\d+)/(?P<activityid>\d+)$', views.control),
	re_path(r'^activate/(?P<id>\d+)$', views.activate),
	re_path(r'^add/(?P<category>[-\w]+)$', views.add),
	re_path(r'^add/(?P<category>[-\w]+)/(?P<dateid>[-\w]+)/(?P<toggle>\d+)$', views.add),
	re_path(r'^edit/(?P<activityid>\d+)$', views.edit),
	re_path(r'^edit/(?P<activityid>\d+)/(?P<dateid>[-\w]+)$', views.edit),
	re_path(r'^back/(?P<month>[-\w]+)/(?P<year>\d+)$', views.back),
	re_path(r'^remove/category/(?P<dateid>\d+)/(?P<cat>[-\w]+)$', views.remove),
	re_path(r'^remove/category/(?P<cat>[-\w]+)$', views.remove),
	re_path(r'^remove/(?P<dateid>\d+)/(?P<activityid>\d+)$', views.remove),
	re_path(r'^time/(?P<dateid>\d+)$', views.updateTime),
	re_path(r'^dashboard$', views.dashboard),
	re_path(r'^changeday/(?P<dateid>\d+)/(?P<choice>[-\w]+)$', views.changeDays),
	re_path(r'^agenda/clear/(?P<dateid>\d+)/(?P<activityid>\d+)$', views.clearagenda),
	re_path(r'^agenda/(?P<dateid>\d+)/(?P<activityid>\d+)/(?P<clicked>[-\w\s\+]+)$', views.agenda)
	
	#re_path(r'^books/(?P<id>\d+)/add$', views.reviewbook),
	#re_path(r'^books/add$', views.addbook),
	#re_path(r'^books/delete/(?P<id>\d+)$', views.deletereview),
	#re_path(r'^users/(?P<id>\d+)$', views.userinfo),
	#re_path(r'^destroy$', views.destroy)
]
