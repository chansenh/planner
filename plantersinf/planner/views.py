from django.shortcuts import render,redirect
from planner.models import Activity,Date,Category
import datetime

activecalandar={'month':'','year':''}
def index(request):
	months={}
	listofactivities = Activity.objects.order_by('category').values_list('name','category','id').distinct()
	#aprilactivities=Activity.objects.filter(name='sex')#.order_by('category').values_list('name','category').distinct()
	distinctactivities={}
	context = {
		'aprilactivities': Activity.objects.filter(activity_date__month='may',activity_date__year=2020).order_by('category').values_list('name','category').distinct(),
		'activitiesbyname': distinctactivities,
		'activities':Activity.objects.all(),
		'dates': Date.objects.all(),#where month == 1 = jan, month==2 = feb...
		'yearrange': [],
		'year': {},
		'categories':Category.objects.all(),
		'weeklength':range(1,7)
	}
	print('loading...')
	
	for name,catid,aid in listofactivities:
		if name not in distinctactivities.keys():
			#Activity.objects.get()
			distinctactivities[name] = (aid,name,catid)
	#rangeofyears = Date.objects.all().order_by('year').distinct()
	#print(rangeofyears)
	today = datetime.date.today()
	timestring = today.strftime("%d/%m/%Y")
	currentyear = int(timestring.split('/')[2]) #2020
	#grabyear = Date.objects.filter(year='')
	yearrange = []
	years=[]
	for year in range(currentyear-5,currentyear+5): #range of 5 years to populate dates
		yearexists = Date.objects.filter(year=year)
		if yearexists:
			yearrange.append(year)
			
			
			yearlydates={
				'january':{
					'length':range(1,32),
					'startday': findWeekday(str(year)+'-01-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-01-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='january').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-01-01')['daynum']),findWeekday(str(year)+'-01-01')['daynum'],31),
					#get unique activiteis by name for current month and year
					#'editactivities': Activity.objects.filter(activity_date__month='january',activity_date__year=year).order_by('category').values_list('name','category').distinct()
				},
				'february':{
					'length':range(1,29),
					'startday': findWeekday(str(year)+'-02-01')['weekday'],
					'numberofweeks':numberOfWeeks(28,findWeekday(str(year)+'-02-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='february').order_by('day'),numberOfWeeks(28,findWeekday(str(year)+'-02-01')['daynum']),findWeekday(str(year)+'-02-01')['daynum'],28)
				},
				'march':{
					'length':range(1,32),
					'startday': findWeekday(str(year)+'-03-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-03-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='march').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-03-01')['daynum']),findWeekday(str(year)+'-03-01')['daynum'],31)
				},
				'april':{
					'length':range(1,32),
					'startday': findWeekday(str(year)+'-04-01')['weekday'],
					'numberofweeks':range(numberOfWeeks(31,findWeekday(str(year)+'-04-01')['daynum'])),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='april').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-04-01')['daynum']),findWeekday(str(year)+'-04-01')['daynum'],31)
				},
				'may':{
					'length':range(1,32),
					'startday': findWeekday(str(year)+'-05-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-05-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='may').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-05-01')['daynum']),findWeekday(str(year)+'-05-01')['daynum'],31)
				},
				'june':{
					'length':range(1,31),
					'startday': findWeekday(str(year)+'-06-01')['weekday'],
					'numberofweeks':numberOfWeeks(30,findWeekday(str(year)+'-06-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='june').order_by('day'),numberOfWeeks(30,findWeekday(str(year)+'-06-01')['daynum']),findWeekday(str(year)+'-06-01')['daynum'],30)
				},
				'july':{
					'length':range(1,32),
					'startday': findWeekday(str(year)+'-07-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-07-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='july').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-07-01')['daynum']),findWeekday(str(year)+'-07-01')['daynum'],31)
				},
				'august':{
					'length':range(1,32),
					'startday': findWeekday(str(year)+'-08-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-08-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='august').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-08-01')['daynum']),findWeekday(str(year)+'-08-01')['daynum'],31)
				},
				'september':{
					'length':range(1,31),
					'startday': findWeekday(str(year)+'-09-01')['weekday'],
					'numberofweeks':numberOfWeeks(30,findWeekday(str(year)+'-09-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='september').order_by('day'),numberOfWeeks(30,findWeekday(str(year)+'-09-01')['daynum']),findWeekday(str(year)+'-09-01')['daynum'],30)
				},
				'october':{
					'length':range(1,32),
					'startday': findWeekday(str(year)+'-10-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-10-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='october').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-10-01')['daynum']),findWeekday(str(year)+'-10-01')['daynum'],31)
				},
				'november':{
					'length':range(1,31),
					'startday': findWeekday(str(year)+'-11-01')['weekday'],
					'numberofweeks':numberOfWeeks(30,findWeekday(str(year)+'-11-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='november').order_by('day'),numberOfWeeks(30,findWeekday(str(year)+'-11-01')['daynum']),findWeekday(str(year)+'-11-01')['daynum'],30)
				},
				'december':{
					'length':range(1,32),
					'startday': findWeekday(str(year)+'-12-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-12-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='december').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-12-01')['daynum']),findWeekday(str(year)+'-12-01')['daynum'],31)
				}
			}
			yearobj = {str(year): yearlydates}
			years.append(yearobj)
			
	#year=[january,february,march,april,may,june,july,august,september,october,november,december]
	monthlist=['january','february','march','april','may','june','july','august','september','october','november','december']
	#need something for leap year
			
	#print(yearrange)
	context['years']=years
	context['activemonth'] = activecalandar['month']
	context['activeyear'] =  activecalandar['year']
	activecalandar['year']=""
	activecalandar['month']=""
	#context['aprilactivities'] = aprilactivities
	#print(context['dates'])
	#print(context['activities'])
	#print(context[2021])
	#print(years)
	#for activity in context['year']:
	#	print(activity)
	#	print(context['year'][activity])
		#print(activity)
	#	activity.delete()

	#for date in context['dates']:
	#	date.delete()

	#for cat in context['categories']:
	#	cat.delete()
	
	return render(request,"planner/datelist.html",context)

def back(request,month,year):
	#print('{},{}'.format(month,year))
	activecalandar['month'] = month
	activecalandar['year'] = year
	print(activecalandar)
	return redirect('/')

def add(request, category, dateid='',toggle=0):
	#implement check to validate category syntax
	#print('existing categories')
	#for each in Category.objects.all():
		#print(each.category)
	cat = Category.objects.filter(category=category)
	if not cat:
		#create category
		Category.objects.create(category=category)
	else:
		print("Category already exists")
	if dateid:
		return redirect("/date/{}/{}".format(dateid,toggle))
	else:
		return redirect("/create/")

def remove(request,activityid='',dateid='',cat=''):
	if cat:
		#removes category from existance muahahaha
		category = Category.objects.get(category=cat)
		category.delete()
	else:
		#removes activity. only other removal is activity
		activitytoremove = Activity.objects.get(id=activityid)
		#print(activitytoremove.name,activitytoremove.id)
		activitytoremove.delete()
	if dateid and cat:
		#dateid present indicates origin date page
		# cat present indicates category was deleted 
		# in that case redirect back to the date origin
		# 1 toggles the create activity modal for user to be back where they started when category was removed
		return redirect('/date/{}/1'.format(dateid))
	elif dateid and not cat:
		#activity was dleted. go back to the origin date page
		return redirect('/date/{}'.format(dateid))
	else:
		#remove call came from the create html page
		# redirect to create html
		return redirect("/create/")




def date(request,id,toggle=0):
	
	date = Date.objects.get(id=id)
	#grab all activities where start_date.date<=activity_date and end_date.date>=activity_date
	#grab all activities where date object to be loaded falls between activity start and end date
	activities = Activity.objects.all()
	#day of the week restrictions need to be added here when implemented
	#print(date.date)
	
	#activities = activities.filter(start_date__date__lte=date.date, end_date__date__gte=date.date)
	activities = activities.filter(activity_date__date=date.date).order_by('start_time')
	context = {
		'activities':activities,
		'date': date,
		'categories':Category.objects.all(),
		'toggle':toggle
	}
	#for date in context['dates']:
	#	print(date.date,date.start_count,date.end_count)
	#for act in context['activities']:
		#print(act.current_time,act.active,act.start_time,act.end_time)
	return render(request, "planner/date.html",context)

def createRangeOfDates(start_date,end_date,name,storestart,storeend,duration,daysoftheweek,color,category):
	year = [0,31,28,31,30,31,30,31,31,30,31,30,31]#zero to take up zeroth spot; starting at index >=1
	startdateinfo = findWeekday(start_date)
	enddateinfo = findWeekday(end_date)
	startmonth = int(start_date.split('-')[1])
	startyear = int(start_date.split('-')[0])
	monthstring=''
	daystring=''
	startday = int(start_date.split('-')[2])
	endday = int(end_date.split('-')[2])
	endmonth = int(end_date.split('-')[1])
	endyear = int(end_date.split('-')[0])
	alldates = Date.objects.all()
	#print(alldates)
	#print('creating activity with cat =',category)
	foundstart=0
	foundend=0
	week = daysoftheweek.split(',')
	looppurpose = ['date','activity']
	# check every date in existance to the new start and end dates and all dates inbetween
	# if a match is made then date exists no need to create a duplicate
	#grab month/day explicitly instead of looping through all dates
	#first loop will create the date objects
	#second loop will create the activities
	for purpose in looppurpose:
		print('in loop; purpose is',purpose)
		
		#spans over multiple years
		if startyear!=endyear:
			#a forloop for the length of years. and do the else below for each year
			for currentyear in range(startyear,endyear+1):
				if currentyear==startyear:
					#go from start month to the december 31

					#go through each month
					for currentmonth in range(startmonth,13):#include 12
						#grab day amount of relevant month
						dayamount = year[currentmonth]
						
						#we are at the first month
						if currentmonth==startmonth:#begin from start day to dayamount in the current month
							for currentday in range(startday,dayamount+1):
								
								dateinfo = formatDateToString(currentmonth,currentday,currentyear)
								if purpose=='date':
									query = Date.objects.filter(date=dateinfo['date'])
									if not query:#create the date
										
										newdateobject= Date.objects.create(date=dateinfo['date'],month=dateinfo['month'],day=dateinfo['day'],year=dateinfo['year'],start_count=0,end_count=0,weekday=dateinfo['weekday'])
										
								if purpose=='activity' and week.count(dateinfo['weekday']):
									#create activities for date ranges only if weekday of date is among the user's selected days
									print('new activity time!')
									newactivity = Activity.objects.create(name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=dateinfo['date']),start_time=storestart,end_time=storeend,duration=duration,current_time='00:00:00',days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
									print(newactivity.name)
						else: #currentmonth is some month passed the start month. go from 1st to last day of the month
							for currentday in range(1,dayamount+1):
								
								dateinfo = formatDateToString(currentmonth,currentday,currentyear)
								if purpose=='date':
									query = Date.objects.filter(date=dateinfo['date'])
									if not query:#create the date
										
										newdateobject= Date.objects.create(date=dateinfo['date'],month=dateinfo['month'],day=dateinfo['day'],year=dateinfo['year'],start_count=0,end_count=0,weekday=dateinfo['weekday'])
										
								if purpose=='activity' and week.count(dateinfo['weekday']):
									#create activities for date ranges only if weekday of date is among the user's selected days
									print('new activity time!')
									newactivity = Activity.objects.create(name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=dateinfo['date']),start_time=storestart,end_time=storeend,duration=duration,current_time='00:00:00',days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
									print(newactivity.name)

					
				elif currentyear==endyear:
					#go from january 1 to end month

					#go through each month
					for currentmonth in range(1,endmonth+1):#include 12
						#grab day amount of relevant month
						dayamount = year[currentmonth]
						
						#we are at the last month
						if currentmonth==endmonth:#begin from first day to end activity day of dayamount in the current month
							for currentday in range(1,endday+1):
								
								dateinfo = formatDateToString(currentmonth,currentday,currentyear)
								if purpose=='date':
									query = Date.objects.filter(date=dateinfo['date'])
									if not query:#create the date
										
										newdateobject= Date.objects.create(date=dateinfo['date'],month=dateinfo['month'],day=dateinfo['day'],year=dateinfo['year'],start_count=0,end_count=0,weekday=dateinfo['weekday'])
										
								if purpose=='activity' and week.count(dateinfo['weekday']):
									#create activities for date ranges only if weekday of date is among the user's selected days
									
									newactivity = Activity.objects.create(name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=dateinfo['date']),start_time=storestart,end_time=storeend,duration=duration,current_time='00:00:00',days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
									
						else: #currentmonth is some month before the end month. go from 1st to last day of the month
							for currentday in range(1,dayamount+1):
								
								dateinfo = formatDateToString(currentmonth,currentday,currentyear)
								if purpose=='date':
									query = Date.objects.filter(date=dateinfo['date'])
									if not query:#create the date
										
										newdateobject= Date.objects.create(date=dateinfo['date'],month=dateinfo['month'],day=dateinfo['day'],year=dateinfo['year'],start_count=0,end_count=0,weekday=dateinfo['weekday'])
										
								if purpose=='activity' and week.count(dateinfo['weekday']):
									#create activities for date ranges only if weekday of date is among the user's selected days
									print('new activity time!')
									newactivity = Activity.objects.create(name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=dateinfo['date']),start_time=storestart,end_time=storeend,duration=duration,current_time='00:00:00',days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
									print(newactivity.name)
					
			
				else:
					#current year is a year inbetween start and end year. fill entire year from jan 1 to dec 31

					#go through each month
					for currentmonth in range(1,13):#include 12
						#grab day amount of relevant month
						dayamount = year[currentmonth]
						
						#go from 1st to last day of the month
						for currentday in range(1,dayamount+1):
							
							dateinfo = formatDateToString(currentmonth,currentday,currentyear)
							if purpose=='date':
								query = Date.objects.filter(date=dateinfo['date'])
								if not query:#create the date
									
									newdateobject= Date.objects.create(date=dateinfo['date'],month=dateinfo['month'],day=dateinfo['day'],year=dateinfo['year'],start_count=0,end_count=0,weekday=dateinfo['weekday'])
									
							if purpose=='activity' and week.count(dateinfo['weekday']):
								#create activities for date ranges only if weekday of date is among the user's selected days
								
								newactivity = Activity.objects.create(name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=dateinfo['date']),start_time=storestart,end_time=storeend,duration=duration,current_time='00:00:00',days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
								
					
		
		# start and end years are equal
		else:
			#date range is within one month
			if endmonth==startmonth:
				print('same month!')
				for currentday in range(startday,endday+1):
					if startmonth<10:
						monthstring = '0{}'.format(startmonth)
					else:
						monthstring=startmonth
					if currentday<10:
						daystring='0{}'.format(currentday)
					else:
						daystring=currentday
					date= '{}-{}-{}'.format(startyear,monthstring,daystring)
					dateinfo = findWeekday(date)
					if purpose=='date':
						query = Date.objects.filter(date=date)
						if not query:#create the date
							print('creating new date object')
							newdateobject= Date.objects.create(date=date,month=dateinfo['month'],day=dateinfo['day'],year=dateinfo['year'],start_count=0,end_count=0,weekday=dateinfo['weekday'])
							print(newdateobject.date)
					if purpose=='activity' and week.count(dateinfo['weekday']):
						#create activities for date ranges only if weekday of date is among the user's selected days
						print('new activity time!')
						newactivity = Activity.objects.create(name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=date),start_time=storestart,end_time=storeend,duration=duration,current_time='00:00:00',days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
						print(newactivity.name)
			#date range greater than 1 month 		
			else:

				#go through each month
				for currentmonth in range(startmonth,endmonth+1):
					#grab day amount of relevant month
					dayamount = year[currentmonth]
					
					#we are at the first month
					if currentmonth==startmonth:#begin from start day to dayamount in the current month
						for currentday in range(startday,dayamount+1):
							if currentmonth<10:
								monthstring = '0{}'.format(currentmonth)
							else:
								monthstring=currentmonth
							if currentday<10:
								daystring='0{}'.format(currentday)
							else:
								daystring=currentday
							date= '{}-{}-{}'.format(startyear,monthstring,daystring)
							dateinfo = findWeekday(date)
							if purpose=='date':
								query = Date.objects.filter(date=date)
								if not query:#create the date
									newdateobject = Date.objects.create(date=date,month=dateinfo['month'],day=dateinfo['day'],year=dateinfo['year'],start_count=0,end_count=0,weekday=dateinfo['weekday'])
							if purpose=='activity' and week.count(dateinfo['weekday']):
								#create activities for date ranges only if date weekday is among the selected days
								newactivity = Activity.objects.create(name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=date),start_time=storestart,end_time=storeend,duration=duration,current_time='00:00:00',days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
						
					#we are at the last month of date range
					elif currentmonth==endmonth:#loop from first day of the month to end day in date range 
						for currentday in range(1,endday+1):
							if currentmonth<10:
								monthstring = '0{}'.format(currentmonth)
							else:
								monthstring=currentmonth
							if currentday<10:
								daystring='0{}'.format(currentday)
							else:
								daystring=currentday
							date= '{}-{}-{}'.format(startyear,monthstring,daystring)
							dateinfo = findWeekday(date)
							if purpose=='date':
								query = Date.objects.filter(date=date)
								if not query:#create the date
									newdateobject = Date.objects.create(date=date,month=dateinfo['month'],day=dateinfo['day'],year=dateinfo['year'],start_count=0,end_count=0,weekday=dateinfo['weekday'])
							if purpose=='activity' and week.count(dateinfo['weekday']):
								#create activities for date ranges only if date weekday is among the selected days
								newactivity = Activity.objects.create(name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=date),start_time=storestart,end_time=storeend,duration=duration,current_time='00:00:00',days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
								
					#we are at a month inbetween the start and end months
					else:#loop through 1 to the dayamount in the current month; entire month gets filled
						for currentday in range(1,dayamount+1):
							if currentmonth<10:
								monthstring = '0{}'.format(currentmonth)
							else:
								monthstring=currentmonth
							if currentday<10:
								daystring='0{}'.format(currentday)
							else:
								daystring=currentday
							date= '{}-{}-{}'.format(startyear,monthstring,daystring)
							dateinfo = findWeekday(date)
							if purpose=='date':
								query = Date.objects.filter(month=dateinfo['month'],day=dateinfo['day'])
								if not query:#create the date
									newdateobject = Date.objects.create(date=date,month=dateinfo['month'],day=dateinfo['day'],year=dateinfo['year'],start_count=0,end_count=0,weekday=dateinfo['weekday'])
							if purpose=='activity' and week.count(dateinfo['weekday']):
								#create activities for date ranges only if date weekday is among the selected days
								newactivity = Activity.objects.create(name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=date),start_time=storestart,end_time=storeend,duration=duration,current_time='00:00:00',days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
								

# start and end is string, selecteddays is list of abbreviated days of the week selected during activity creation		
#def createActivityRange(start_date,end_date,selecteddays):


	#for date in alldates:
	#	print(date.id)
	#	print(date)
	#	startcount=date.start_count
	#	endcount=date.end_count
	#	print('before =',date.date)
	#	if date.date == start_date:
	#		startcount+=1
	#		foundstart=1
	##	if date.date == end_date:
	#		endcount+=1
	#		foundend=1
	#		print('end =',date.date)
	#	if foundstart or foundend:
	#		updated = Date.objects.get(id=date.id)
	#		updated.start_count = startcount
	#		updated.end_count = endcount
	#		#activity = Activity
	#		updated.save()
	#first occurance, create new date boject
	#
	#day of the week implementation#
	#if start_date in end_date:
	#	if not foundstart:#activity starts and ends on same day and date wasnt found
	#		s = Date.objects.create(date=start_date,start_count=1,end_count=1,month=startdateinfo['month'],day=startdateinfo['day'], year=startdateinfo['year'], weekday=startdateinfo['weekday'])
	#		
	#else:# different start and end dates
	#	if not foundstart: # start date was not found create date object with start date as its date
	#		s = Date.objects.create(date=start_date,start_count=1,end_count=0,month=startdateinfo['month'],day=startdateinfo['day'], year=startdateinfo['year'], weekday=startdateinfo['weekday'])
	#	
	#	if not foundend: # end date was not found create date object with end date as its date	
	#		e = Date.objects.create(date=end_date,start_count=0,end_count=1,month=enddateinfo['month'],day=enddateinfo['day'], year=enddateinfo['year'], weekday=enddateinfo['weekday'])
	


def create(request,date=''):
	if request.method=="POST":
		#print(request.POST['categoryselection'])
		#print(request.POST)
		days=[]
		## CREATE RANGE DATE DATA
		week = ['sun','mon','tue','wed','thu','fri','sat']
		postkeys = request.POST.keys() #[random, stuff, tue, wed, sat, more, rnaomd]
		#print(postkeys)
		for key,value in request.POST.items():
			if key in week and value=="1":
				# key = 'sun','mon','tue'...will return true from a dictionary containing those words
				days.append(key)
		
		#s=request.POST['jojo']
		category = request.POST['categoryselection']
		start = request.POST['start_time']
		end = request.POST['end_time']
		storestart = "{}{}".format(request.POST['start_time'].split(':')[0], request.POST['start_time'].split(':')[1])
		storeend = "{}{}".format(request.POST['end_time'].split(':')[0], request.POST['end_time'].split(':')[1])
		color = request.POST['activitycolor']
		#print(storestart)
		#recurring = request.POST['recurring']
		startsplit = start.split(':')
		endsplit = end.split(':')
#		if int(endsplit[0])>int(startsplit[0]):
#			hr = abs(int(startsplit[0])-int(endsplit[0]))
		hr = abs(int(endsplit[0]) - int(startsplit[0]))
		min = int(endsplit[1])-int(startsplit[1])
		#const of 60 to represent 60 miutes in an hour
		if min<0:
			min = 60-abs(min)
			hr = hr-1
		if min<10:
			min="0{}".format(min)
		if hr<10:
			hr="0{}".format(hr)
		duration = "{}:{}:00".format(hr,min)
		#print(duration)
		daysoftheweek=''
		for each in days:
			daysoftheweek+=each+','
		

		start_date=request.POST['sdate']
		
		end_date = request.POST['edate']
		## CREATE RANGE DATE DATA

		# no days are selected and the activity takes place on a single day
		# automatically find teh appropriate weekday and assign it
		if not days and start_date == end_date:
			day = findWeekday(start_date)
			singleday = day['weekday']+','
			createRangeOfDates(start_date,end_date,request.POST['name'],start,end,duration,singleday,color,category)
		# no days are selected and a range of days exist for the activity
		# assume all days are desired and assign all days to the activity over the particular range
		elif not days:
			daysoftheweek='sun,mon,tue,wed,thu,fri,sat'
			createRangeOfDates(start_date,end_date,request.POST['name'],start,end,duration,daysoftheweek,color,category)
		# at least a single day was selected, carry on as normal
		else:
			for each in days:
				daysoftheweek+=each+','
		
			createRangeOfDates(start_date,end_date,request.POST['name'],start,end,duration,daysoftheweek,color,category)
		
		if date:
			print('POSTING ON ',date)
			returndate = Date.objects.get(date=date)
			return redirect("/date/{}".format(returndate.id))
		else:
			return redirect("/")

	#/create is a get request
	else:
		context = {
			'categories': Category.objects.all(),
			'date': date
			}
		#for each in Category.objects.all():
		#	each.delete()
		#for each in Activity.objects.all():
		#	each.delete()
		#for each in Date.objects.all():
		#	each.delete()
		return render(request, "planner/create.html",context)

def edit(request,activityid=-1,dateid=-1):
	if request.method=='POST':
		#print(request.POST)
		#change/update activity with new time values
		
		days=[]
		## CREATE RANGE DATE DATA
		week = ['sun','mon','tue','wed','thu','fri','sat']
		postkeys = request.POST.keys() #[random, stuff, tue, wed, sat, more, rnaomd]
		updateall=1
		#print(postkeys)
		for key,value in request.POST.items():
			
			if key in week and value=='1':
				
				# key = 'sun','mon','tue'...will return true from a dictionary containing those words
				days.append(key)
			if key=='allevents':
				updateall=int(value)
		
		
		#s=request.POST['jojo']
		category = request.POST['categoryselection']
		start = request.POST['start_time']
		end = request.POST['end_time']
		storestart = "{}{}".format(request.POST['start_time'].split(':')[0], request.POST['start_time'].split(':')[1])
		storeend = "{}{}".format(request.POST['end_time'].split(':')[0], request.POST['end_time'].split(':')[1])
		color = request.POST['activitycolor']
		#print(storestart)
		#recurring = request.POST['recurring']
		startsplit = start.split(':')
		endsplit = end.split(':')
#		if int(endsplit[0])>int(startsplit[0]):
#			hr = abs(int(startsplit[0])-int(endsplit[0]))
		hr = abs(int(endsplit[0]) - int(startsplit[0]))
		min = int(endsplit[1])-int(startsplit[1])
		#const of 60 to represent 60 miutes in an hour
		if min<0:
			min = 60-abs(min)
			hr = hr-1
		if min<10:
			min="0{}".format(min)
		if hr<10:
			hr="0{}".format(hr)
		duration = "{}:{}:00".format(hr,min)
		#print(duration)
		daysoftheweek=''
		for each in days:
			daysoftheweek+=each+','
		

		start_date=request.POST['sdate']
		
		end_date = request.POST['edate']

		#update all indicates whether or not all activities of the same name will be updated
		if not updateall:
			activitytoupdate = Activity.objects.get(id=activityid)
			activitytoupdate.start_date=Date.objects.get(date=start_date)
			activitytoupdate.end_date=Date.objects.get(date=end_date)
			activitytoupdate.name=request.POST['name']
			activitytoupdate.start_time=request.POST['start_time']
			activitytoupdate.end_time=request.POST['end_time']
			activitytoupdate.duration=duration
			activitytoupdate.days=daysoftheweek
			activitytoupdate.color=color
			activitytoupdate.category=Category.objects.get(category=category)
			activitytoupdate.save()
			
		else:
			#updateall is set to 1
			#delete activities of the same name and create new activities
			activitygroup = Activity.objects.filter(name=request.POST['name'])
			for activity in activitygroup:
				activity.delete()

			## CREATE RANGE DATE DATA

			# no days are selected and the activity takes place on a single day
			# automatically find teh appropriate weekday and assign it
			if not days and start_date == end_date:
				day = findWeekday(start_date)
				singleday = day['weekday']+','
				createRangeOfDates(start_date,end_date,request.POST['name'],start,end,duration,singleday,color,category)
			# no days are selected and a range of days exist for the activity
			# assume all days are desired and assign all days to the activity over the particular range
			elif not days:
				daysoftheweek='sun,mon,tue,wed,thu,fri,sat'
				createRangeOfDates(start_date,end_date,request.POST['name'],start,end,duration,daysoftheweek,color,category)
			# at least a single day was selected, carry on as normal
			else:
				for each in days:
					daysoftheweek+=each+','
			
				createRangeOfDates(start_date,end_date,request.POST['name'],start,end,duration,daysoftheweek,color,category)
			#for activity in activitygroup:
				#sdate = Date.objects.get(date=activitystart_date)
				#activity.name=activityname
				#activity.start_date
			# needs to be updated; duration,current_time,days?,active=0,	
			#redirect back to calendar once changes are made
		print(dateid)
		if dateid == '-1':
			return redirect("/")
		else:
			return redirect("/date/{}".format(dateid))
			
	# the same activity shares the activity's name,start date,end date,start_time,end_time,color,category,days
	elif not activityid == -1:
		#print(dateid)
		activity = Activity.objects.get(id=activityid)
		dotw = {
			'mon':0,
			'tue':0,
			'wed':0,
			'thu':0,
			'fri':0,
			'sat':0,
			'sun':0
			}
		mon=0
		tue=0
		wed=0
		thu=0
		fri=0
		sat=0
		sun=0

		for eachday in activity.days.split(','):
			if eachday=='mon':
				mon=1
			if eachday=='tue':
				tue=1
			if eachday=='wed':
				wed=1
			if eachday=='thu':
				thu=1
			if eachday=='fri':
				fri=1
			if eachday=='sat':
				sat=1
			if eachday=='sun':
				sun=1

		context={
			'editid':activity.id,
			'editname':activity.name,
			'editstart_date':activity.start_date.date,
			'editend_date':activity.end_date.date,
			'editstart_time':activity.start_time,
			'editend_time':activity.end_time,
			'editcolor':activity.color,
			'editcategory':activity.category.category,
			'editdotw':activity.days,
			'categories':Category.objects.all(),
			'dateid':dateid,
			'mon':mon,
			'tue':tue,
			'wed':wed,
			'thu':thu,
			'fri':fri,
			'sat':sat,
			'sun':sun
		}	
		return render(request,"planner/edit.html", context)
	return redirect("/")


#controls pause and clear options for activity times
def control(request,dateid):
	if request.method == 'POST':
		print("PAUSED")
		#print(request.POST)

		time = {}
		active={}
		action={}
		aid=""
		for key in request.POST.keys():
			if not key=='csrfmiddlewaretoken':
				id = key.split('_')[1]
				if key.split('_')[0]=="time":
					time[id]=request.POST[key]
				if key.split('_')[0]=="active":
					active[id]=request.POST[key]
				if key.split('_')[0]=="pause":
					aid=key.split('_')[1]
					action[id]="pause"
				if key.split('_')[0]=="stop":
					aid=key.split('_')[1]
					action[id]="stop"
		
		for id in active:
			activity = Activity.objects.get(id=id)
			activity.current_time = time[id]
			if int(active[id])==0 and id in action and action[id]=="stop":#clear it
				activity.active=0
				activity.current_time="00:00:00"
			elif int(active[id])==0:#pause it
				activity.active=0
			
			if int(active[id])==1 and id in action and action[id]=="stop":#clear it
				activity.active=0
				activity.current_time="00:00:00"
			elif int(active[id])==1 :#keep it goin
				activity.active=1
			activity.save()
		gobacktodate = "/date/{}".format(dateid)
		#print(gobacktodate)
		return redirect(gobacktodate)

def updateTime(request, dateid):
	if request.method=='POST':
		start={}
		end={}
		activityid=""
		for key in request.POST.keys():
			#print(key,request.POST[key])
			if (not key=='csrfmiddlewaretoken') and (key.find('_') >=0):
				activityid = key.split('_')[1]
				
				if key.split('_')[0]=="starttime":
					start[activityid] = request.POST[key]
					
				if key.split('_')[0]=="endtime":
					end[activityid] = request.POST[key]
				

		startsplit = start[activityid].split(':')
		endsplit = end[activityid].split(':')
#		if int(endsplit[0])>int(startsplit[0]):
#			hr = abs(int(startsplit[0])-int(endsplit[0]))
		hr = abs(int(endsplit[0]) - int(startsplit[0]))
		min = int(endsplit[1])-int(startsplit[1])
		#const of 60 to represent 60 miutes in an hour
		if min<0:
			min = 60-abs(min)
			hr = hr-1
		if min<10:
			min="0{}".format(min)
		if hr<10:
			hr="0{}".format(hr)
		duration = "{}:{}:00".format(hr,min)

		activity = Activity.objects.get(id=activityid)
		activity.start_time = start[activityid]
		activity.end_time = end[activityid]
		activity.duration = duration
		activity.save()
		return redirect("/date/{}".format(dateid))


def activate(request,id):
	activate = Activity.objects.get(id=id)
	
	
	if int(activate.active)==0:
		activate.active = 1
		#print("im active")
		#print(activate.id,activate.name, activate.active)
		activate.save()
	return redirect("/date")

def dashboard(request):
	today = datetime.date.today()
	timestring = today.strftime("%d/%m/%Y")
	currentyear = int(timestring.split('/')[2]) #2020
	#grabyear = Date.objects.filter(year='')
	yearrange = []
	years=[]
	for year in range(currentyear-5,currentyear+1): #range of 5 years to populate dates
		yearexists = Date.objects.filter(year=year)
		if yearexists:
			yearrange.append(year)
			#print(str(year),'exists')
			
			yearlydates={
				'january':{
					'length':range(1,32),
					'completed':percentageCompleteActivities('january',year,range(1,32)),
					'categorygrouped':activitiesGroupedByCategory('january',year,range(1,32)),
					'startday': findWeekday(str(year)+'-01-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-01-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='january').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-01-01')['daynum']),findWeekday(str(year)+'-01-01')['daynum'],31),
					#get unique activiteis by name for current month and year
					#'editactivities': Activity.objects.filter(activity_date__month='january',activity_date__year=year).order_by('category').values_list('name','category').distinct()
				},
				'february':{
					'length':range(1,29),
					'completed':percentageCompleteActivities('february',year,range(1,29)),
					'categorygrouped':activitiesGroupedByCategory('february',year,range(1,29)),
					'startday': findWeekday(str(year)+'-02-01')['weekday'],
					'numberofweeks':numberOfWeeks(28,findWeekday(str(year)+'-02-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='february').order_by('day'),numberOfWeeks(28,findWeekday(str(year)+'-02-01')['daynum']),findWeekday(str(year)+'-02-01')['daynum'],28)
				},
				'march':{
					'length':range(1,32),
					'completed':percentageCompleteActivities('march',year,range(1,32)),
					'categorygrouped':activitiesGroupedByCategory('march',year,range(1,32)),
					'startday': findWeekday(str(year)+'-03-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-03-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='march').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-03-01')['daynum']),findWeekday(str(year)+'-03-01')['daynum'],31)
				},
				'april':{
					'length':range(1,32),
					'completed':percentageCompleteActivities('april',year,range(1,32)),
					'categorygrouped':activitiesGroupedByCategory('april',year,range(1,32)),
					'startday': findWeekday(str(year)+'-04-01')['weekday'],
					'numberofweeks':range(numberOfWeeks(31,findWeekday(str(year)+'-04-01')['daynum'])),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='april').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-04-01')['daynum']),findWeekday(str(year)+'-04-01')['daynum'],31)
				},
				'may':{
					'length':range(1,32),
					'completed':percentageCompleteActivities('may',year,range(1,32)),
					'categorygrouped':activitiesGroupedByCategory('may',year,range(1,32)),
					'startday': findWeekday(str(year)+'-05-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-05-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='may').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-05-01')['daynum']),findWeekday(str(year)+'-05-01')['daynum'],31)
				},
				'june':{
					'length':range(1,31),
					'completed':percentageCompleteActivities('june',year,range(1,31)),
					'categorygrouped':activitiesGroupedByCategory('june',year,range(1,31)),
					'startday': findWeekday(str(year)+'-06-01')['weekday'],
					'numberofweeks':numberOfWeeks(30,findWeekday(str(year)+'-06-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='june').order_by('day'),numberOfWeeks(30,findWeekday(str(year)+'-06-01')['daynum']),findWeekday(str(year)+'-06-01')['daynum'],30)
				},
				'july':{
					'length':range(1,32),
					'completed':percentageCompleteActivities('july',year,range(1,32)),
					'categorygrouped':activitiesGroupedByCategory('july',year,range(1,32)),
					'startday': findWeekday(str(year)+'-07-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-07-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='july').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-07-01')['daynum']),findWeekday(str(year)+'-07-01')['daynum'],31)
				},
				'august':{
					'length':range(1,32),
					'completed':percentageCompleteActivities('august',year,range(1,32)),
					'categorygrouped':activitiesGroupedByCategory('august',year,range(1,32)),
					'startday': findWeekday(str(year)+'-08-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-08-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='august').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-08-01')['daynum']),findWeekday(str(year)+'-08-01')['daynum'],31)
				},
				'september':{
					'length':range(1,31),
					'completed':percentageCompleteActivities('september',year,range(1,31)),
					'categorygrouped':activitiesGroupedByCategory('september',year,range(1,31)),
					'startday': findWeekday(str(year)+'-09-01')['weekday'],
					'numberofweeks':numberOfWeeks(30,findWeekday(str(year)+'-09-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='september').order_by('day'),numberOfWeeks(30,findWeekday(str(year)+'-09-01')['daynum']),findWeekday(str(year)+'-09-01')['daynum'],30)
				},
				'october':{
					'length':range(1,32),
					'completed':percentageCompleteActivities('october',year,range(1,32)),
					'categorygrouped':activitiesGroupedByCategory('october',year,range(1,32)),
					'startday': findWeekday(str(year)+'-10-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-10-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='october').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-10-01')['daynum']),findWeekday(str(year)+'-10-01')['daynum'],31)
				},
				'november':{
					'length':range(1,31),
					'completed':percentageCompleteActivities('november',year,range(1,31)),
					'categorygrouped':activitiesGroupedByCategory('november',year,range(1,31)),
					'startday': findWeekday(str(year)+'-11-01')['weekday'],
					'numberofweeks':numberOfWeeks(30,findWeekday(str(year)+'-11-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='november').order_by('day'),numberOfWeeks(30,findWeekday(str(year)+'-11-01')['daynum']),findWeekday(str(year)+'-11-01')['daynum'],30)
				},
				'december':{
					'length':range(1,32),
					'completed':percentageCompleteActivities('december',year,range(1,32)),
					'categorygrouped':activitiesGroupedByCategory('december',year,range(1,32)),
					'startday': findWeekday(str(year)+'-12-01')['weekday'],
					'numberofweeks':numberOfWeeks(31,findWeekday(str(year)+'-12-01')['daynum']),
					'eachweek': whereTheDatesGo(Date.objects.all().filter(year=year,month='december').order_by('day'),numberOfWeeks(31,findWeekday(str(year)+'-12-01')['daynum']),findWeekday(str(year)+'-12-01')['daynum'],31)
				}
			}
			yearobj = {str(year): yearlydates}
			years.append(yearobj)
	
	#year=[january,february,march,april,may,june,july,august,september,october,november,december]
	monthlist=['january','february','march','april','may','june','july','august','september','october','november','december']
	#need something for leap year

	#grab all activities within a month
	monthact = Activity.objects.filter(activity_date__month='june',activity_date__year=2020).order_by('activity_date__day')
	#for each in monthact:
		
	
	context={}
	context['years']=years
	
	return render(request,"planner/dashboard.html",context)
	

def activitiesGroupedByCategory(month,year,length):
	#grab all activities during a month
	activitybymonth = Activity.objects.filter(activity_date__month=month,activity_date__year=year).order_by('activity_date__day')
	days={}
	
	
	for i in length:
		dailyacts = Activity.objects.filter(activity_date__month=month,activity_date__day=i,activity_date__year=year).order_by('category')
		category={}
	#for each day in the month, sort activities by category and count number of activites belonging to that category.
		for activity in dailyacts:
			if activity.category.category not in category.keys():
				category[activity.category.category]=0

			category[activity.category.category]+=1
		days[i]=category
	#days[1]=['fun':5,'misc':3,'homework':2]..etc

	return days


#takes in all activities in a month, outputs a list of day objects with first object == first day of month and last object == last day of month:
#[{},{},{},{},{},{},{},]
# {
# 
# completed activities
# incomplete activities
# }
def percentageCompleteActivities(month,year,length):
	focus=None
	
	day={}
	monthact = Activity.objects.filter(activity_date__month=month,activity_date__year=year).order_by('activity_date__day')
	#grab all activities with the same month and day
	
	for i in length:
		
		#orderby is just alphabetical order for names. no real purpose i guess
		dailyacts = Activity.objects.filter(activity_date__month=month,activity_date__day=i,activity_date__year=year).order_by('name')
		#turn daily activity list and determine complete and incomplete activites
		#month[activityname]={
		# 						duration
		# 						current_time
		# 						count
		# 				}
		day[i]={}
		for activity in dailyacts:
			dur = activity.duration.split(':')
			durationhr,durationmin,durationsec = int(dur[0]), int(dur[1]), int(dur[2])
			cur = activity.current_time.split(':')
			currenthr,currentmin,currentsec = int(cur[0]), int(cur[1]), int(cur[2])
			totaldurationsec = (durationhr*60*60) + (durationmin*60) + (durationsec)
			totalcurrentsec = (currenthr*60*60) + (currentmin*60) + (currentsec)
			percentagecomplete = (totalcurrentsec/totaldurationsec)*100
			day[i][activity.name]=percentagecomplete
	
	return day
			
	
	#for current in daysortedlist:
		#start of iterations
	#	if focus is None:
	#		focus=current
		#grab information about the same activity
	#	if current.name is focus.name:
	#		return None
		#moved onto a new activity name,chance focus and reset used variables
	#	else:
	#		return None

		

	#
def findWeekday(date):
	#day of the week implementation#
	
	dotw = ['mon','tue','wed','thu','fri','sat','sun']
	processdate = date.split('-')
	year = processdate[0]
	month = processdate[1]
	day = processdate[2]
	
	day = datetime.datetime.strptime("{} {} {}".format(day,month,year), '%d %m %Y').weekday()
	if int(month)==1:
		month='january'
	elif int(month)==2:
		month='february'
	elif int(month)==3:
		month='march'
	elif int(month)==4:
		month='april'
	elif int(month)==5:
		month='may'
	elif int(month)==6:
		month='june'
	elif int(month)==7:
		month='july'
	elif int(month)==8:
		month='august'
	elif int(month)==9:
		month='september'
	elif int(month)==10:
		month='october'
	elif int(month)==11:
		month='november'
	elif int(month)==12:
		month='december'
	
	
	return {
		'month':month,
		'day':int(processdate[2]),
		'year': int(year),
		'weekday':dotw[day],
		'daynum':day,
		'date':date
	}

def numberOfWeeks(numberofdays,startday):#startday is day of the week in a number form 0-6 = monday-sunday
	if numberofdays==30:
		if startday==5:
			return 6
		else:
			return 5
	if numberofdays==31:
		if startday<=3 or startday==6: #calander format of sun,mon,tues,wed,thurs,fri,sat; but python regards sunday as day 6 instead of day 0
			return 5
		else:
			return 6
		
	if numberofdays==28:
		if startday==6:#sunday
			return 4
		else:
			return 5
	if numberofdays==29:#leap year
		return 5
	return 0
#firstdotm = day that the month starts on in number form 0-6
#dates all dates in a given month
def whereTheDatesGo(dates,totalweeks,firstdotm,monthlength): #which date objects go into which weeks. starting day of week is needed to determine where dates go
	#changes from ['mon','tue','wed','thu','fri','sat','sun'] definition to ['sun','mon','tue','wed','thu','fri','sat']
	exists=None
	if firstdotm==6:
		firstdotm=0
	elif firstdotm<=5:
		firstdotm+=1
	else:
		return None
	week = ['sun','mon','tue','wed','thu','fri','sat']
	offset = 7-firstdotm
	#problem: move dates to appropriate weeks based on starting day of month;; needs some kind of offset
	week1=dates.filter(day__lte=offset)#add to day values the offset to alter week positions for the dates
	week2= dates.filter(day__gte=offset+1).filter(day__lte=offset+7)
	week3= dates.filter(day__gte=offset+8).filter(day__lte=offset+14)
	week4= dates.filter(day__gte=offset+15).filter(day__lte=offset+21)
	week5=None
	week6=None
	if monthlength>28:
		week5= dates.filter(day__gte=offset+22).filter(day__lte=offset+28)
		week6= dates.filter(day__gte=offset+29)
	if week1 or week2 or week3 or week4 or week5 or week6:
		exists={1:1}
	return{
		'exists':exists,
		'week1': week1,
		'week2': week2,
		'week3': week3,
		'week4': week4,
		'week5': week5,
		'week6': week6
	}

def formatDateToString(currentmonth,currentday,currentyear):
	if currentmonth<10:
		monthstring = '0{}'.format(currentmonth)
	else:
		monthstring=currentmonth
	if currentday<10:
		daystring='0{}'.format(currentday)
	else:
		daystring=currentday
	date= '{}-{}-{}'.format(currentyear,monthstring,daystring)
	dateinfo = findWeekday(date)
	return dateinfo