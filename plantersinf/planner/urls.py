
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
	url(r'^date/(?P<id>\d+)$', views.date),
	url(r'^date/(?P<id>\d+)/(?P<toggle>\d+)$', views.date),
	url(r'^create/$', views.create),
	url(r'^create/(?P<date>[-\w]+)$', views.create),
	url(r'^control/(?P<dateid>\d+)$', views.control),
	url(r'^control/(?P<dateid>\d+)/(?P<activityid>\d+)$', views.control),
	url(r'^activate/(?P<id>\d+)$', views.activate),
	url(r'^add/(?P<category>[-\w]+)$', views.add),
	url(r'^add/(?P<category>[-\w]+)/(?P<dateid>[-\w]+)/(?P<toggle>\d+)$', views.add),
	url(r'^edit/(?P<activityid>\d+)$', views.edit),
	url(r'^edit/(?P<activityid>\d+)/(?P<dateid>[-\w]+)$', views.edit),
	url(r'^back/(?P<month>[-\w]+)/(?P<year>\d+)$', views.back),
	url(r'^remove/category/(?P<dateid>\d+)/(?P<cat>[-\w]+)$', views.remove),
	url(r'^remove/category/(?P<cat>[-\w]+)$', views.remove),
	url(r'^remove/(?P<dateid>\d+)/(?P<activityid>\d+)$', views.remove),
	url(r'^time/(?P<dateid>\d+)$', views.updateTime),
	url(r'^dashboard$', views.dashboard),
	url(r'^changeday/(?P<dateid>\d+)/(?P<choice>[-\w]+)$', views.changeDays),
	url(r'^agenda/(?P<dateid>\d+)/(?P<activityid>\d+)/(?P<clicked>[-\w\s]+)$', views.agenda)
	#url(r'^books/(?P<id>\d+)/add$', views.reviewbook),
	#url(r'^books/add$', views.addbook),
	#url(r'^books/delete/(?P<id>\d+)$', views.deletereview),
	#url(r'^users/(?P<id>\d+)$', views.userinfo),
	#url(r'^destroy$', views.destroy)
]
