
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
	url(r'^date/(?P<id>\d+)$', views.date),
	url(r'^create/$', views.create),
	url(r'^create/(?P<date>[-\w]+)$', views.create),
	url(r'^control/(?P<dateid>\d+)$', views.control),
	url(r'^activate/(?P<id>\d+)$', views.activate),
	url(r'^add/(?P<category>[-\w]+)$', views.add),
	url(r'^back/(?P<month>[-\w]+)/(?P<year>\d+)$', views.back),
	url(r'^remove/(?P<dateid>\d+)/(?P<activityid>\d+)$', views.remove),
	#url(r'^books/(?P<id>\d+)/add$', views.reviewbook),
	#url(r'^books/add$', views.addbook),
	#url(r'^books/delete/(?P<id>\d+)$', views.deletereview),
	#url(r'^users/(?P<id>\d+)$', views.userinfo),
	#url(r'^destroy$', views.destroy)
]
