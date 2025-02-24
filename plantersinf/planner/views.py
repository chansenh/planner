from django.shortcuts import render,redirect
from planner.models import Activity,Date,Category,Agenda
import datetime

activecalandar={"month":"","year":""}
def index(request):

	months={}
	distinctactivities={}
	context = {
		"activitiesbyname": distinctactivities,
		"activities":Activity.objects.all(),
		"dates": Date.objects.all(),#where month == 1 = jan, month==2 = feb...
		"yearrange": [],
		"year": {},
		"categories":Category.objects.all(),
		"weeklength":range(1,7)
	}
	print("loading...")
	
	
	today = datetime.date.today()
	timestring = today.strftime("%d/%m/%Y")
	currentyear = int(timestring.split("/")[2]) #2020
	
	yearrange = [] #list of numerical years to iterate through
	years=[] #list of yearobj which contains all information about specific year
	for year in range(currentyear-2,currentyear+2): #created a limit of 4 years to populate dates

		#checks that year exists
		yearexists = Date.objects.filter(year=year)
		if yearexists:
			#append the year number to the list
			yearrange.append(year)
			
			#object containing all activity information of a specific year
			yearlydates={
				"january":{
					"activities": getMonthlyActivities("january",year),
					"length":range(1,32),
					"startday": findWeekday(str(year)+"-01-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-01-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="january").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-01-01")["daynum"]),findWeekday(str(year)+"-01-01")["daynum"],31),
					#get unique activiteis by name for current month and year
					#"editactivities": Activity.objects.filter(activity_date__month="january",activity_date__year=year).order_by("category").values_list("name","category").distinct()
				},
				"february":{
					"activities": getMonthlyActivities("february",year),
					"length":range(1,29),
					"startday": findWeekday(str(year)+"-02-01")["weekday"],
					"numberofweeks":numberOfWeeks(28,findWeekday(str(year)+"-02-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="february").order_by("day"),numberOfWeeks(28,findWeekday(str(year)+"-02-01")["daynum"]),findWeekday(str(year)+"-02-01")["daynum"],28)
				},
				"march":{
					"activities": getMonthlyActivities("march",year),
					"length":range(1,32),
					"startday": findWeekday(str(year)+"-03-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-03-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="march").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-03-01")["daynum"]),findWeekday(str(year)+"-03-01")["daynum"],31)
				},
				"april":{
					"activities": getMonthlyActivities("april",year),
					"length":range(1,32),
					"startday": findWeekday(str(year)+"-04-01")["weekday"],
					"numberofweeks":range(numberOfWeeks(31,findWeekday(str(year)+"-04-01")["daynum"])),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="april").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-04-01")["daynum"]),findWeekday(str(year)+"-04-01")["daynum"],31)
				},
				"may":{
					"activities": getMonthlyActivities("may",year),
					"length":range(1,32),
					"startday": findWeekday(str(year)+"-05-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-05-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="may").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-05-01")["daynum"]),findWeekday(str(year)+"-05-01")["daynum"],31)
				},
				"june":{
					"activities": getMonthlyActivities("june",year),
					"length":range(1,31),
					"startday": findWeekday(str(year)+"-06-01")["weekday"],
					"numberofweeks":numberOfWeeks(30,findWeekday(str(year)+"-06-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="june").order_by("day"),numberOfWeeks(30,findWeekday(str(year)+"-06-01")["daynum"]),findWeekday(str(year)+"-06-01")["daynum"],30)
				},
				"july":{
					"activities": getMonthlyActivities("july",year),
					"length":range(1,32),
					"startday": findWeekday(str(year)+"-07-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-07-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="july").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-07-01")["daynum"]),findWeekday(str(year)+"-07-01")["daynum"],31)
				},
				"august":{
					"activities": getMonthlyActivities("august",year),
					"length":range(1,32),
					"startday": findWeekday(str(year)+"-08-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-08-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="august").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-08-01")["daynum"]),findWeekday(str(year)+"-08-01")["daynum"],31)
				},
				"september":{
					"activities": getMonthlyActivities("september",year),
					"length":range(1,31),
					"startday": findWeekday(str(year)+"-09-01")["weekday"],
					"numberofweeks":numberOfWeeks(30,findWeekday(str(year)+"-09-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="september").order_by("day"),numberOfWeeks(30,findWeekday(str(year)+"-09-01")["daynum"]),findWeekday(str(year)+"-09-01")["daynum"],30)
				},
				"october":{
					"activities": getMonthlyActivities("october",year),
					"length":range(1,32),
					"startday": findWeekday(str(year)+"-10-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-10-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="october").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-10-01")["daynum"]),findWeekday(str(year)+"-10-01")["daynum"],31)
				},
				"november":{
					"activities": getMonthlyActivities("november",year),
					"length":range(1,31),
					"startday": findWeekday(str(year)+"-11-01")["weekday"],
					"numberofweeks":numberOfWeeks(30,findWeekday(str(year)+"-11-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="november").order_by("day"),numberOfWeeks(30,findWeekday(str(year)+"-11-01")["daynum"]),findWeekday(str(year)+"-11-01")["daynum"],30)
				},
				"december":{
					"activities": getMonthlyActivities("december",year),
					"length":range(1,32),
					"startday": findWeekday(str(year)+"-12-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-12-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="december").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-12-01")["daynum"]),findWeekday(str(year)+"-12-01")["daynum"],31)
				}
			}

			#creates an object
			# key == String representation of the numerical year
			# value == yearlydates object
			yearobj = {str(year): yearlydates}
			# appends yearobj to main years list
			years.append(yearobj)
			
	
	monthlist=["january","february","march","april","may","june","july","august","september","october","november","december"]
	#need something for leap year
			
	# provides information to display on the DOM
	context["years"]=years
	context["activemonth"] = activecalandar["month"]
	context["activeyear"] =  activecalandar["year"]
	#clears location on where to begin displaying the year. will fill in once init
	activecalandar["year"]=""
	activecalandar["month"]=""
	
	# dev: manual reseting of database
	#for activity in context["year"]:
	#	print(activity)
	#	print(context["year"][activity])
	#	print(activity)
	#	activity.delete()
	#for date in context["dates"]:
	#	date.delete()
	#for cat in context["categories"]:
	#	cat.delete()
	
	#ascending order sort of every activity in each week
	for year in context["years"]:
		for year,yearcontent in year.items():
			for month,monthcontent in yearcontent.items():
				
				weeklyinfo = sorted(monthcontent['eachweek'].items())
				monthcontent['eachweek'] = weeklyinfo
				print(monthcontent['eachweek'])
			
		

	return render(request,"planner/datelist.html",context)

#sets month and year to control display on the DOM
def back(request,month,year):
	activecalandar["month"] = month
	activecalandar["year"] = year
	print(activecalandar)
	return redirect("/")

# creating function
# used to create a new category for an activity to associate with.
# toggles visual on DOM when using the creating function within a specific day
# enables activity creation using top level visual 
def add(request, category, dateid="",toggle=0):
	
	cat = Category.objects.filter(category=category)
	if not cat:
		#create category
		Category.objects.create(category=category)
	else:
		#category exists
		print("Category already exists")
	if dateid:
		#add function call originated from specific day 
		return redirect("/date/{}/{}".format(dateid,toggle))
	else:
		#add function call originated from top level
		return redirect("/create/")

# delete function
# deletes category from category list or removes activity from specific date
def remove(request,activityid="",dateid="",cat=""):
	if cat:
		#removes category from existance muahahaha
		category = Category.objects.get(category=cat)
		category.delete()
	else:
		#removes activity. only other removal is activity
		activitytoremove = Activity.objects.get(id=activityid)
		activitytoremove.delete()

	#after category or activity is deleted, return to appropriate origin
	if dateid and cat:
		#dateid present indicates origin date page
		# cat present indicates category was deleted 
		# in that case redirect back to the date origin
		# 1 toggles the create activity modal for user to be back where they started when category was removed
		return redirect("/date/{}/1".format(dateid))
	elif dateid and not cat:
		#activity was dleted. go back to the origin date page
		return redirect("/date/{}".format(dateid))
	else:
		#remove call came from the create html page
		# redirect to create html
		return redirect("/create/")



# read function
# grabs all data for a specific date to display on DOM
def date(request,id,toggle=0):
	
	date = Date.objects.get(id=id)
	#grab all activities where start_date.date<=activity_date and end_date.date>=activity_date
	#grab all activities where date object to be loaded falls between activity start and end date
	activities = Activity.objects.filter(activity_date__date=date.date).order_by("start_time")
	#day of the week restrictions need to be added here when implemented
	#print(date.date)
	
	#each list entry is an object with name and list properties
	allagendas = []
	

	#connect agenda to activities
	for activity in activities:
		query = Agenda.objects.filter(name=activity.name)
		#print(query)
		for agenda in query:
			activity.agenda=agenda
			activity.save()
		#if query and activity.agenda is None:
		#	activity.agenda = query[0]
	
	#check each activity for an agenda and gather into a list to show on front-end
	for activity in activities:
		if activity.agenda:
			agendaname = activity.agenda.name
			commaseperatedlist = activity.agenda.list
			commaseperatedactivelist = activity.agenda.active
			agendalist = commaseperatedlist.split(",")
			activelist = commaseperatedactivelist.split(",")
			pairedlist =[]
			for agenda,active in zip(agendalist,activelist):
				pairedlist.append((agenda,active))

			
			allagendas.append((agendaname,pairedlist))

	# object used to format data
	day = {
		'mon':'Monday',
		'tue':'Tuesday',
		'wed':'Wednesday',
		'thu':'Thursday',
		'fri':'Friday',
		'sat':'Saturday',
		'sun':'Sunday',
		}
	
	# context object is used to display data on DOM
	context = {
		"activities":activities,
		"date": date,
		"categories":Category.objects.all(),
		"toggle":toggle,
		"allagendas":allagendas,
		"agendas":Agenda.objects.all(),
		"day":day[date.weekday]
	}
	
	#for date in context["dates"]:
	#	print(date.date,date.start_count,date.end_count)
	#for act in context["activities"]:
		#print(act.current_time,act.active,act.start_time,act.end_time)
	return render(request, "planner/date.html",context)

# sideeffect = maybe add daysoftheweek to caculate the amount of total dates being created for each function call.


#creates date objects which are able to contain and display activity objects
# date objects must be instantiated before activities are able to be added
def createDateRange(start_date,end_date,dotw):
	print("creating date range")
	year = [0,31,28,31,30,31,30,31,31,30,31,30,31]#zero to take up zeroth spot; starting at index >=1
	months = ["null","jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
	startday = int(start_date.split("-")[2])
	startmonth = int(start_date.split("-")[1])
	startyear = int(start_date.split("-")[0])
	endday = int(end_date.split("-")[2])
	endmonth = int(end_date.split("-")[1])
	endyear = int(end_date.split("-")[0])
	week = dotw.split(",")
	activitydays=0
	#endyear - startyear = amoutn of years
	#initialize all days of each month that the activity occurs on
	for currentyear in range(startyear,endyear+1):
		#creating dates existing within a specific year
		if startyear == endyear:
			for currentmonth in range(startmonth,endmonth+1):
				daysinmonth = year[currentmonth]
				#print(daysinmonth)
				#initialize each day of current month including start and end months
				for currentday in range(1,year[currentmonth]+1):
					#print(months[currentmonth],currentday,currentyear)
					#does this day match with a day from week variable
					#does this day fall in range between start_date and end_date
					
					#if currentmonth==startmonth and currentday>=startday
					#print(currentmonth,currentday,currentyear)
					dateinfo = formatDateToString(currentmonth,currentday,currentyear)
					#keep track of active days
					if week.count(dateinfo["weekday"]):
						activitydays+=1
					
					#print(dateinfo)
					query = Date.objects.filter(date=dateinfo["date"])
					#check to see if date has been created
					if not query:#create the date
						newdateobject= Date.objects.create(date=dateinfo["date"],month=dateinfo["month"],day=dateinfo["day"],year=dateinfo["year"],start_count=0,end_count=0,weekday=dateinfo["weekday"])
						#print(dateinfo)

		
		#creating dates spanning multiple years
		else:


			if currentyear == startyear:
				for currentmonth in range(startmonth,len(year)):
					
					for currentday in range(1,year[currentmonth]+1):
						#print(months[currentmonth],currentday,currentyear)
						dateinfo = formatDateToString(currentmonth,currentday,currentyear)
						#keep track of active days
						if week.count(dateinfo["weekday"]):
							activitydays+=1
						query = Date.objects.filter(date=dateinfo["date"])
						if not query:#create the date
							newdateobject= Date.objects.create(date=dateinfo["date"],month=dateinfo["month"],day=dateinfo["day"],year=dateinfo["year"],start_count=0,end_count=0,weekday=dateinfo["weekday"])
							#print(dateinfo)
			if currentyear == endyear:
				for currentmonth in range(1,endmonth+1):
					
					for currentday in range(1,year[currentmonth]+1):
						#print(months[currentmonth],currentday,currentyear)
						dateinfo = formatDateToString(currentmonth,currentday,currentyear)
						#keep track of active days
						if week.count(dateinfo["weekday"]):
							activitydays+=1
						query = Date.objects.filter(date=dateinfo["date"])
						if not query:#create the date
							newdateobject= Date.objects.create(date=dateinfo["date"],month=dateinfo["month"],day=dateinfo["day"],year=dateinfo["year"],start_count=0,end_count=0,weekday=dateinfo["weekday"])
							#print(dateinfo)
			if currentyear>startyear and currentyear<endyear:
				for currentmonth in range(1,len(year)):
					
						for currentday in range(1,year[currentmonth]+1):
							#print(months[currentmonth],currentday,currentyear)
							dateinfo = formatDateToString(currentmonth,currentday,currentyear)
							#keep track of active days
							if week.count(dateinfo["weekday"]):
								activitydays+=1
							query = Date.objects.filter(date=dateinfo["date"])
							if not query:#create the date
								newdateobject= Date.objects.create(date=dateinfo["date"],month=dateinfo["month"],day=dateinfo["day"],year=dateinfo["year"],start_count=0,end_count=0,weekday=dateinfo["weekday"])
								#print(dateinfo)
	return activitydays


# creates activities over the span of dates specified during the create function all
def createActivities(start_date,end_date,name,storestart,storeend,duration,daysoftheweek,color,category,finish=0):
	year = [0,31,28,31,30,31,30,31,31,30,31,30,31]#zero to take up zeroth spot; starting at index >=1
	startdateinfo = findWeekday(start_date)
	enddateinfo = findWeekday(end_date)
	startmonth = int(start_date.split("-")[1])
	startyear = int(start_date.split("-")[0])
	monthstring=""
	daystring=""
	startday = int(start_date.split("-")[2])
	endday = int(end_date.split("-")[2])
	endmonth = int(end_date.split("-")[1])
	endyear = int(end_date.split("-")[0])
	alldates = Date.objects.all()
	foundstart=0
	foundend=0
	foundname=0
	week = daysoftheweek.split(",")

	# check every date in existance to the new start and end dates and all dates inbetween
	# if a match is made then date exists no need to create a duplicate
	#grab month/day explicitly instead of looping through all dates
	#first loop will create the date objects
	#second loop will create the activities

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
							query = Date.objects.filter(date=dateinfo["date"])
							#prevents duplicate activity names from being created
							if week.count(dateinfo["weekday"]) and not findActivityName(name, query):
								#create activities for date ranges only if weekday of date is among the user"s selected days
								print("new activity time!")
								newactivity = Activity.objects.create(finish=finish,name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=dateinfo["date"]),start_time=storestart,end_time=storeend,duration=duration,current_time="00:00:00",days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
								print(type(newactivity.name))
					else: #currentmonth is some month passed the start month. go from 1st to last day of the month
						for currentday in range(1,dayamount+1):
							
							dateinfo = formatDateToString(currentmonth,currentday,currentyear)
							query = Date.objects.filter(date=dateinfo["date"])
							#prevents duplicate activity names from being created
							if week.count(dateinfo["weekday"]) and not findActivityName(name, query):
								#create activities for date ranges only if weekday of date is among the user"s selected days
								print("new activity time!")
								newactivity = Activity.objects.create(finish=finish,name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=dateinfo["date"]),start_time=storestart,end_time=storeend,duration=duration,current_time="00:00:00",days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
								print(type(newactivity.name))

				
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
							query = Date.objects.filter(date=dateinfo["date"])
							#prevents duplicate activity names from being created
							if week.count(dateinfo["weekday"]) and not findActivityName(name, query):
								#create activities for date ranges only if weekday of date is among the user"s selected days
								
								newactivity = Activity.objects.create(finish=finish,name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=dateinfo["date"]),start_time=storestart,end_time=storeend,duration=duration,current_time="00:00:00",days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
								print(type(newactivity.name))
					else: #currentmonth is some month before the end month. go from 1st to last day of the month
						for currentday in range(1,dayamount+1):
							
							dateinfo = formatDateToString(currentmonth,currentday,currentyear)
							query = Date.objects.filter(date=dateinfo["date"])
							#prevents duplicate activity names from being created
							if week.count(dateinfo["weekday"]) and not findActivityName(name, query):
								#create activities for date ranges only if weekday of date is among the user"s selected days
								print("new activity time!")
								newactivity = Activity.objects.create(finish=finish,name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=dateinfo["date"]),start_time=storestart,end_time=storeend,duration=duration,current_time="00:00:00",days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
								print(type(newactivity.name))
				
		
			else:
				#current year is a year inbetween start and end year. fill entire year from jan 1 to dec 31

				#go through each month
				for currentmonth in range(1,13):#include 12
					#grab day amount of relevant month
					dayamount = year[currentmonth]
					
					#go from 1st to last day of the month
					for currentday in range(1,dayamount+1):
						
						dateinfo = formatDateToString(currentmonth,currentday,currentyear)
						query = Date.objects.filter(date=dateinfo["date"])
						#prevents duplicate activity names from being created
						if week.count(dateinfo["weekday"]) and not findActivityName(name, query):
							#create activities for date ranges only if weekday of date is among the user"s selected days
							
							newactivity = Activity.objects.create(finish=finish,name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=dateinfo["date"]),start_time=storestart,end_time=storeend,duration=duration,current_time="00:00:00",days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
							print(type(newactivity.name))
				
	
	# start and end years are equal
	else:
		#date range is within one month
		if endmonth==startmonth:
			print("same month!")
			for currentday in range(startday,endday+1):
				if startmonth<10:
					monthstring = "0{}".format(startmonth)
				else:
					monthstring=startmonth
				if currentday<10:
					daystring="0{}".format(currentday)
				else:
					daystring=currentday
				date= "{}-{}-{}".format(startyear,monthstring,daystring)
				dateinfo = findWeekday(date)
				query = Date.objects.filter(date=dateinfo["date"])
				#prevents duplicate activity names from being created
				if week.count(dateinfo["weekday"]) and not findActivityName(name, query):
					#create activities for date ranges only if weekday of date is among the user"s selected days
					print("new activity time!")
					newactivity = Activity.objects.create(finish=finish,name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=date),start_time=storestart,end_time=storeend,duration=duration,current_time="00:00:00",days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
					print(type(newactivity.name))
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
							monthstring = "0{}".format(currentmonth)
						else:
							monthstring=currentmonth
						if currentday<10:
							daystring="0{}".format(currentday)
						else:
							daystring=currentday
						date= "{}-{}-{}".format(startyear,monthstring,daystring)
						dateinfo = findWeekday(date)
						query = Date.objects.filter(date=dateinfo["date"])
						#prevents duplicate activity names from being created
						if week.count(dateinfo["weekday"]) and not findActivityName(name, query):
							#create activities for date ranges only if date weekday is among the selected days
							newactivity = Activity.objects.create(finish=finish,name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=date),start_time=storestart,end_time=storeend,duration=duration,current_time="00:00:00",days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
							print(type(newactivity.name))
				#we are at the last month of date range
				elif currentmonth==endmonth:#loop from first day of the month to end day in date range 
					for currentday in range(1,endday+1):
						if currentmonth<10:
							monthstring = "0{}".format(currentmonth)
						else:
							monthstring=currentmonth
						if currentday<10:
							daystring="0{}".format(currentday)
						else:
							daystring=currentday
						date= "{}-{}-{}".format(startyear,monthstring,daystring)
						dateinfo = findWeekday(date)
						query = Date.objects.filter(date=dateinfo["date"])
						#prevents duplicate activity names from being created
						if week.count(dateinfo["weekday"]) and not findActivityName(name, query):
							#create activities for date ranges only if date weekday is among the selected days
							newactivity = Activity.objects.create(finish=finish,name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=date),start_time=storestart,end_time=storeend,duration=duration,current_time="00:00:00",days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
							print(type(newactivity.name))
				#we are at a month inbetween the start and end months
				else:#loop through 1 to the dayamount in the current month; entire month gets filled
					for currentday in range(1,dayamount+1):
						if currentmonth<10:
							monthstring = "0{}".format(currentmonth)
						else:
							monthstring=currentmonth
						if currentday<10:
							daystring="0{}".format(currentday)
						else:
							daystring=currentday
						date= "{}-{}-{}".format(startyear,monthstring,daystring)
						dateinfo = findWeekday(date)
						query = Date.objects.filter(date=dateinfo["date"])
						#prevents duplicate activity names from being created
						if week.count(dateinfo["weekday"]) and not findActivityName(name, query):
							#create activities for date ranges only if date weekday is among the selected days
							newactivity = Activity.objects.create(finish=finish,name=name,start_date=Date.objects.get(date=start_date),end_date=Date.objects.get(date=end_date),activity_date=Date.objects.get(date=date),start_time=storestart,end_time=storeend,duration=duration,current_time="00:00:00",days=daysoftheweek,active=0,color=color,category=Category.objects.get(category=category))
							print(type(newactivity.name))

#reads activity name from query parameter in function call
def findActivityName(name,query):
	
	found=0
	for date in query:
		for activity in date.recurring.all():
			if name == activity.name:
				found = 1
	return found

#deletes agenda list for a specified activity
def clearagenda(request,dateid,activityid):
	
	activityobj = Activity.objects.get(id=activityid)
	agendaobject = Agenda.objects.get(name=activityobj.name)
	agendaobject.list=""
	agendaobject.active=""
	agendaobject.save()
	return redirect("/date/{}".format(dateid))


# agenda adds/removes a checklist element to a specified activity
def agenda(request,dateid,activityid,clicked):
	
	if request.POST:
		
		incomingdata = processPOST(request.POST)
		agendaentry=incomingdata["agendaentry"]
		activity = Activity.objects.get(id=activityid)
		#agenda = Agenda.objects.get(name=activity.name)
		
		
		if incomingdata["checked"]=="1":
			tasks=None
			if activity.name in incomingdata.keys():
				
				tasks = incomingdata[activity.name]
				
				if not (type(tasks) is list):
					temp = tasks
					tasks=[]
					tasks.append(temp)
			finishAgendaTask(activity.name,tasks,clicked)
		#deletes agenda entry for an activity
		elif str(incomingdata["remove"])=="1":
			removeFromAgenda(activity.name,agendaentry)
		# adds agenda entry for an activity
		elif str(incomingdata["add"])=="1":
			addToAgenda(activity.name,agendaentry)
		# moves agenda entry within an activity's agenda list
		elif str(incomingdata["alter"])=="up" or str(incomingdata["alter"])=="down" :
			alterAgenda(activity.name,agendaentry,incomingdata["alter"])
			
	return redirect("/date/{}".format(dateid))


# logs a task under an activity name as completed or not with a 1 or 0
def finishAgendaTask(name,entries,clicked):
	agendaobject = Agenda.objects.get(name=name)
	if entries is None:
		activelist = agendaobject.active.split(",")
		
		for idx in range(len(activelist)):
			activelist[idx]="0"

		
		commaseperatedactive = ",".join(activelist)
		agendaobject.active = commaseperatedactive

	else:
		agendalist = agendaobject.list.split(",")
		activelist = agendaobject.active.split(",")
		
		
		for task,active in zip(agendalist,activelist):
			
			if task in entries:
				
				if clicked==task:
					
					if active=="1":
						
					#where is task position to relate to active list
						activelist[agendalist.index(task)]="0"
					elif active=="0":
						
						activelist[agendalist.index(task)]="1"
					#where is task position to relate to active list
			else:
				activelist[agendalist.index(task)]="0"
		
		commaseperatedactive = ",".join(activelist)
		agendaobject.active = commaseperatedactive
	
	agendaobject.save()

# update function
# programatically moves an agenda element up or down the list
def alterAgenda(agendaname,entry,direction):
	agendaobject = Agenda.objects.get(name=agendaname)
	
	print("altering")
	
	if agendaobject:
		print("going ",direction)
		#agenda list exists for specified activity
		#add entry to list property in agenda object
		print(agendaobject.list)
		print(agendaobject.active)
		commaseperatedlist = agendaobject.list
		commaseperatedactive = agendaobject.active
		listobject = commaseperatedlist.split(",")
		activeobject = commaseperatedactive.split(",")
		entryidx = listobject.index(entry)
		
		if direction=="up" and not entryidx==0:
			
			listobject[entryidx] = listobject[entryidx-1]
			listobject[entryidx-1] = entry
			tempactive = activeobject[entryidx]
			activeobject[entryidx] = activeobject[entryidx-1]
			activeobject[entryidx-1] = tempactive
		elif direction=="down" and not entryidx==len(listobject)-1:
			listobject[entryidx] = listobject[entryidx+1]
			listobject[entryidx+1] = entry
			tempactive = activeobject[entryidx]
			activeobject[entryidx] = activeobject[entryidx+1]
			activeobject[entryidx+1] = tempactive


		#listobject.append(entry)
		commaseperatedlist = ",".join(listobject)
		commaseperatedactive = ",".join(activeobject)
		agendaobject.list = commaseperatedlist
		agendaobject.active = commaseperatedactive
		print(agendaobject.list)
		print(agendaobject.active)
		agendaobject.save()
	
	print("pau altering")


# agendaname is unique name of activity connecting to a single agenda shared between all activites
# entry is the new entry to the agenda
def addToAgenda(agendaname,entry):
	agendaobjectlist = Agenda.objects.filter(name=agendaname)
	for each in agendaobjectlist:
		print(each.name)


	if not agendaobjectlist:
		#no agenda exists for the specified name
		#create a new agenda
		newagenda  = Agenda.objects.create(name=agendaname,list=entry,active="0")
		newagenda.save()
	else:
		#agenda list exists for specified activity
		#add entry to list property in agenda object
		commaseperatedlist = agendaobjectlist[0].list
		commaseperatedactive = agendaobjectlist[0].active
		listobject = commaseperatedlist.split(",")
		activelist = commaseperatedactive.split(",")
		listobject.append(entry)
		activelist.append("0")
		commaseperatedlist = ",".join(listobject)
		commaseperatedactive = ",".join(activelist)
		agendaobjectlist[0].list = commaseperatedlist
		agendaobjectlist[0].active = commaseperatedactive
		agendaobjectlist[0].save()

# deletes function
# removes task from agenda
def removeFromAgenda(agendaname,entry):
	agendaobject = Agenda.objects.get(name=agendaname)
	#for agenda in Agenda.objects.all():
		#agenda.delete()
	#construct list from string
	#print(agendaobject.list)
	agendalist = agendaobject.list.split(",")
	activelist = agendaobject.active.split(",")
	#print(agendalist)
	#find entry to remove
	print("removing ",entry," from ",agendaname)
	#index of entry index
	del activelist[agendalist.index(entry)]
	agendalist.remove(entry)
	
	
	#deconstruct list back to string
	commaseperatedlist = ",".join(agendalist)
	commaseperatedactive = ",".join(activelist)
	agendaobject.list = commaseperatedlist
	agendaobject.active = commaseperatedactive
	#print(agendaobject.list)
	agendaobject.save()
	
		


# allows updates to all properties of all specified activities
def modifyAllActivities(start_date,end_date,name,start,end,duration,daysoftheweek,color,category):
	startday = int(start_date.split("-")[2])
	endday = int(end_date.split("-")[2])
	startmonth = int(start_date.split("-")[1])
	endmonth = int(end_date.split("-")[1])
	startyear = int(start_date.split("-")[0])
	endyear = int(end_date.split("-")[0])
	activitygroup = Activity.objects.filter(name=name).order_by("activity_date__date")
	activitylist=[]
	week = daysoftheweek.split(",")

	#necessary date objects have been created
	datescreated = createDateRange(start_date, end_date, daysoftheweek)

	#create activities which dont exist within the new date range. !!!!! modify function to not create duplicates
	createActivities(start_date, end_date, name, start, end, duration, daysoftheweek, color, category)
	
	#activities that already exist. need to modify the existing data. possibly remove activities which exist outside of new date range
	for activity in activitygroup:


		#outside of date range/delete activity
		if activity.activity_date.date<start_date or activity.activity_date.date>end_date:
			activity.delete()


		#within date range/change data only
		else:
			#print(activity.activity_date.date)
			dateinfo = findWeekday(activity.activity_date.date)
			
			if week.count(dateinfo["weekday"]):
				activitylist.append(activity)

				activity.start_date=Date.objects.get(date=start_date)
				activity.end_date=Date.objects.get(date=end_date)
				activity.name=name
				activity.start_time=start
				activity.end_time=end
				activity.duration=duration
				activity.days=daysoftheweek
				activity.color=color
				activity.category=Category.objects.get(category=category)
				activity.save()
			else:
				activity.delete()

# updates are applied to all instances of a future activity
def modifyFutureActivities(start_date,end_date,name,start,end,duration,daysoftheweek,color,category):
	#start date is the current date of acitivity which was selected to be modified
	startday = int(start_date.split("-")[2])
	endday = int(end_date.split("-")[2])
	startmonth = int(start_date.split("-")[1])
	endmonth = int(end_date.split("-")[1])
	startyear = int(start_date.split("-")[0])
	endyear = int(end_date.split("-")[0])
	activitygroup = Activity.objects.filter(name=name).order_by("activity_date__date")
	activitylist=[]
	week = daysoftheweek.split(",")

	# create necessary date objects for modified activities
	datescreated = createDateRange(start_date, end_date, daysoftheweek)

	#create activities which dont exist within the new date range. !!!!! modify function to not create duplicates
	createActivities(start_date, end_date, name, start, end, duration, daysoftheweek, color, category)
	
	#activities that already exist. need to modify the existing data. possibly remove activities which exist outside of new date range
	for activity in activitygroup:

		#ignore activities before start_date
		#only modify activities which take place after the start_date
		if activity.activity_date.date>start_date:
			dateinfo = findWeekday(activity.activity_date.date)
			
			# DESCRIPTION: only modify activities which occur during selected weekdays 
			if week.count(dateinfo["weekday"]):
				activitylist.append(activity)

				#? altering activity names could point to a previous date which does not have the newly named activity present
				#activity.name=name
				#activity.start_date=Date.objects.get(date=start_date)
				#? past events that point to a future date could potentially lead to a blank day
				
				activity.end_date=Date.objects.get(date=end_date)
				activity.start_time=start
				activity.end_time=end
				activity.duration=duration
				activity.days=daysoftheweek
				activity.color=color
				activity.category=Category.objects.get(category=category)
				activity.save()

			# DESCRIPTION: delete activities which do not occur on selected weekdays
			else:
				activity.delete()

# NOT YET IMPLEMENTED!
# deletes an activity in the specified date range
def deletePastActivities(start_date,end_date,name,start,end,duration,daysoftheweek,color,category):
	#start date is the current date of acitivity which was selected to be modified
	startday = int(start_date.split("-")[2])
	endday = int(end_date.split("-")[2])
	startmonth = int(start_date.split("-")[1])
	endmonth = int(end_date.split("-")[1])
	startyear = int(start_date.split("-")[0])
	endyear = int(end_date.split("-")[0])
	activitygroup = Activity.objects.filter(name=name).order_by("activity_date__date")
	activitylist=[]
	week = daysoftheweek.split(",")

	# create necessary date objects for modified activities
	datescreated = createDateRange(start_date, end_date, daysoftheweek)

	#create activities which dont exist within the new date range. !!!!! modify function to not create duplicates
	createActivities(start_date, end_date, name, start, end, duration, daysoftheweek, color, category)
	
	#activities that already exist. need to modify the existing data. possibly remove activities which exist outside of new date range
	for activity in activitygroup:

		#ignore activities before start_date
		#only modify activities which take place after the start_date
		if activity.activity_date.date>start_date:
			dateinfo = findWeekday(activity.activity_date.date)
			
			# DESCRIPTION: only modify activities which occur during selected weekdays 
			if week.count(dateinfo["weekday"]):
				activitylist.append(activity)

				#? altering activity names could point to a previous date which does not have the newly named activity present
				#activity.name=name
				#activity.start_date=Date.objects.get(date=start_date)
				#? past events that point to a future date could potentially lead to a blank day
				
				activity.end_date=Date.objects.get(date=end_date)
				activity.start_time=start
				activity.end_time=end
				activity.duration=duration
				activity.days=daysoftheweek
				activity.color=color
				activity.category=Category.objects.get(category=category)
				activity.save()

			# DESCRIPTION: delete activities which do not occur on selected weekdays
			else:
				activity.delete()

# create function used by form element in the DOM
def create(request,date=""):
	if request.method=="POST":
		
		days=[]
		date=str(date)
		## CREATE RANGE DATE DATA
		week = ["sun","mon","tue","wed","thu","fri","sat"]
		print(request.POST)
		incomingdata = processPOST(request.POST)
		print("PROCESSED===",incomingdata)
		
		for key,value in request.POST.items():
			if key in week and value=="1":
				# key = "sun","mon","tue"...will return true from a dictionary containing those words
				days.append(str(key))
		
		#s=incomingdata["jojo"]
		category = str(incomingdata["categoryselection"])
		start = str(incomingdata["start_time"])
		end = str(incomingdata["end_time"])
		storestart = "{}{}".format(str(incomingdata["start_time"]).split(":")[0], str(incomingdata["start_time"]).split(":")[1])
		storeend = "{}{}".format(str(incomingdata["end_time"]).split(":")[0], str(incomingdata["end_time"]).split(":")[1])
		color = str(incomingdata["activitycolor"])
		name = str(incomingdata["name"])
		print("THE TYPE!",type(name))
		#print(storestart)
		#recurring = request.POST["recurring"]
		startsplit = start.split(":")
		endsplit = end.split(":")
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
		daysoftheweek=""
		for each in days:
			daysoftheweek+=each+","
		

		start_date=str(incomingdata["sdate"])
		
		end_date = str(incomingdata["edate"])
		## CREATE RANGE DATE DATA
		createDateRange(start_date,end_date,daysoftheweek)
		# no days are selected and the activity takes place on a single day
		# automatically find teh appropriate weekday and assign it
		if not days and start_date == end_date:
			day = findWeekday(start_date)
			singleday = day["weekday"]+","
			createActivities(str(start_date),str(end_date),str(name),str(start),str(end),str(duration),str(singleday),str(color),str(category))
		# no days are selected and a range of days exist for the activity
		# assume all days are desired and assign all days to the activity over the particular range
		elif not days:
			daysoftheweek="sun,mon,tue,wed,thu,fri,sat"
			createActivities(start_date,end_date,name,start,end,duration,daysoftheweek,color,category)
		# at least a single day was selected, carry on as normal
		else:
			for each in days:
				daysoftheweek+=each+","
		
			createActivities(start_date,end_date,name,start,end,duration,daysoftheweek,color,category)
		
		if date:
			print("POSTING ON ",date)
			returndate = Date.objects.get(date=date)
			return redirect("/date/{}".format(returndate.id))
		else:
			return redirect("/")

	#/create is a get request
	else:
		context = {
			"categories": Category.objects.all(),
			"date": date
			}
		#for each in Category.objects.all():
		#	each.delete()
		#for each in Activity.objects.all():
		#	each.delete()
		#for each in Date.objects.all():
		#	each.delete()
		return render(request, "planner/create.html",context)

# update function used by form element within DOM
def edit(request,activityid=-1,dateid=-1):
	if request.method=="POST":
		#print(request.POST)
		#change/update activity with new time values
		
		days=[]
		## CREATE RANGE DATE DATA
		week = ["sun","mon","tue","wed","thu","fri","sat"]
		print(request.POST)
		incomingdata = processPOST(request.POST)
		print("PROCESSED===",incomingdata)
		updateall=0
		futureevents=0
		#print(postkeys)
		for key,value in request.POST.items():
			
			if str(key) in week and value=="1":
				
				# key = "sun","mon","tue"...will return true from a dictionary containing those words
				days.append(key)
			if str(key)=="allevents":
				updateall=int(value)
			if str(key)=="futureevents":
				futureevents=int(value)
		
		
		#s=request.POST["jojo"]
		category = str(incomingdata["categoryselection"])
		start = str(incomingdata["start_time"])
		end = str(incomingdata["end_time"])
		storestart = "{}{}".format(str(incomingdata["start_time"]).split(":")[0], str(incomingdata["start_time"]).split(":")[1])
		storeend = "{}{}".format(str(incomingdata["end_time"]).split(":")[0], str(incomingdata["end_time"]).split(":")[1])
		color = str(incomingdata["activitycolor"])
		name = str(incomingdata["name"])
		#print(storestart)
		#recurring = request.POST["recurring"]
		startsplit = start.split(":")
		endsplit = end.split(":")
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
		daysoftheweek=""
		for each in days:
			daysoftheweek+=each+","
		

		start_date=str(incomingdata["sdate"])
		
		end_date = str(incomingdata["edate"])
		lengthofactivity = createDateRange(start_date,end_date,daysoftheweek)
		#update all indicates whether or not all activities of the same name will be updated
		if updateall:
			modifyAllActivities(start_date,end_date,name,start,end,duration,daysoftheweek,color,category)
		
		
		#future events is marked
		elif futureevents:
			current = Date.objects.get(id=dateid)
			#print(current.date,start_date)
			modifyFutureActivities(current.date, end_date, name, start, end, duration, daysoftheweek, color, category)
		
		#only update the current activity
		else:
			activitytoupdate = Activity.objects.get(id=activityid)
			activitytoupdate.start_date=Date.objects.get(date=start_date)
			activitytoupdate.end_date=Date.objects.get(date=end_date)
			activitytoupdate.name=name
			activitytoupdate.start_time=start
			activitytoupdate.end_time=end
			activitytoupdate.duration=duration
			activitytoupdate.days=daysoftheweek
			activitytoupdate.color=color
			activitytoupdate.category=Category.objects.get(category=category)
			activitytoupdate.save()

		# create function call was made from top level of application
		if dateid == "-1":
			return redirect("/")
		# create function call was made from within a specific date
		else:
			return redirect("/date/{}".format(dateid))
			
	# the same activity shares the activity"s name,start date,end date,start_time,end_time,color,category,days
	# some activity is referenced
	elif not activityid == -1:
		#lookup specified activity
		activity = Activity.objects.get(id=activityid)
		dotw = {
			"mon":0,
			"tue":0,
			"wed":0,
			"thu":0,
			"fri":0,
			"sat":0,
			"sun":0
			}
		mon=0
		tue=0
		wed=0
		thu=0
		fri=0
		sat=0
		sun=0

		# tracks on what days activity is enabled
		for eachday in activity.days.split(","):
			if eachday=="mon":
				mon=1
			if eachday=="tue":
				tue=1
			if eachday=="wed":
				wed=1
			if eachday=="thu":
				thu=1
			if eachday=="fri":
				fri=1
			if eachday=="sat":
				sat=1
			if eachday=="sun":
				sun=1

		context={
			"editid":activity.id,
			"editname":activity.name,
			"editstart_date":activity.start_date.date,
			"editend_date":activity.end_date.date,
			"editstart_time":activity.start_time,
			"editend_time":activity.end_time,
			"editcolor":activity.color,
			"editcategory":activity.category.category,
			"editdotw":activity.days,
			"categories":Category.objects.all(),
			"dateid":dateid,
			"mon":mon,
			"tue":tue,
			"wed":wed,
			"thu":thu,
			"fri":fri,
			"sat":sat,
			"sun":sun
		}	
		return render(request,"planner/edit.html", context)
	return redirect("/")

#controls pause and clear options for activity times
def control(request,dateid,activityid=0):
	if request.method == "POST":
		print("PAUSED")
		

		time = {}
		active={}
		action={}
		finish={}
		print(request.POST)
		incomingdata = processPOST(request.POST)
		print("PROCESSED===",incomingdata)
		for key in incomingdata.keys():
			if not key=="csrfmiddlewaretoken":
				id = key.split("_")[1]
				if key.split("_")[0]=="time":
					time[id]=str(incomingdata[key])
				if key.split("_")[0]=="active":
					active[id]=str(incomingdata[key])
				if key.split("_")[0]=="pause":
					
					action[id]="pause"
				if key.split("_")[0]=="stop":
					
					action[id]="stop"

				#piggy backing on control function to mark whether or not user marked activity as finished. value inits at 0. user sets to 1
				if key.split("_")[0]=="finish":
					
					finish[id]=int(incomingdata[key])
		
		
		#finish value == 1 when user wants to color in row entry, 0 when user wants to see activity row activated
		if finish:
			for id in finish:			
				activity = Activity.objects.get(id=id)
				if finish[id] != activity.finish:
					activity.finish = finish[id]
					activity.save()
				print(activity)
		if active:
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
	if request.method=="GET":
		print("we in beby")
		activity = Activity.objects.get(id=activityid)
		if activity.finish==1:
			activity.finish=0
		else:
			activity.finish=1
		
		activity.save()
		gobacktodate = "/date/{}".format(dateid)
		
		return redirect(gobacktodate)
	
# updates specified activity's currently elapsed duration
def updateTime(request, dateid):
	if request.method=="POST":
		start={}
		end={}
		activityid=""
		print(request.POST)
		incomingdata = processPOST(request.POST)
		print("PROCESSED===",incomingdata)
		print(incomingdata)
		for key in incomingdata.keys():
			# csrfmiddlewaretoken is not something we require, ignore it
			if (not key=="csrfmiddlewaretoken") and (key.find("_") >=0):
				activityid = key.split("_")[1]
				
				if key.split("_")[0]=="starttime":
					start[activityid] = str(incomingdata[key])
					
				if key.split("_")[0]=="endtime":
					end[activityid] = str(incomingdata[key])
				

		startsplit = start[activityid].split(":")
		endsplit = end[activityid].split(":")
		
		#calculating duration
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

#start time elapse on specified activity
def activate(request,id):
	activate = Activity.objects.get(id=id)
	
	#set an activity to active
	if int(activate.active)==0:
		activate.active = 1
		activate.save()
	return redirect("/date")

# displays a pie chart and bar graph visualization of all activities and their total work time elapsed
def dashboard(request):
	today = datetime.date.today()
	timestring = today.strftime("%d/%m/%Y")
	currentyear = int(timestring.split("/")[2]) #2020
	#grabyear = Date.objects.filter(year="")
	yearrange = []
	years=[]
	for year in range(currentyear-5,currentyear+1): #range of 5 years to populate dates
		yearexists = Date.objects.filter(year=year)
		if yearexists:
			yearrange.append(year)
			#print(str(year),"exists")
			
			yearlydates={
				"january":{
					"length":range(1,32),
					"completed":minutesCompleteActivities("january",year,range(1,32)),
					"categorygrouped":activitiesGroupedByCategory("january",year,range(1,32)),
					"startday": findWeekday(str(year)+"-01-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-01-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="january").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-01-01")["daynum"]),findWeekday(str(year)+"-01-01")["daynum"],31),
					#get unique activiteis by name for current month and year
					#"editactivities": Activity.objects.filter(activity_date__month="january",activity_date__year=year).order_by("category").values_list("name","category").distinct()
				},
				"february":{
					"length":range(1,29),
					"completed":minutesCompleteActivities("february",year,range(1,29)),
					"categorygrouped":activitiesGroupedByCategory("february",year,range(1,29)),
					"startday": findWeekday(str(year)+"-02-01")["weekday"],
					"numberofweeks":numberOfWeeks(28,findWeekday(str(year)+"-02-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="february").order_by("day"),numberOfWeeks(28,findWeekday(str(year)+"-02-01")["daynum"]),findWeekday(str(year)+"-02-01")["daynum"],28)
				},
				"march":{
					"length":range(1,32),
					"completed":minutesCompleteActivities("march",year,range(1,32)),
					"categorygrouped":activitiesGroupedByCategory("march",year,range(1,32)),
					"startday": findWeekday(str(year)+"-03-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-03-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="march").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-03-01")["daynum"]),findWeekday(str(year)+"-03-01")["daynum"],31)
				},
				"april":{
					"length":range(1,32),
					"completed":minutesCompleteActivities("april",year,range(1,32)),
					"categorygrouped":activitiesGroupedByCategory("april",year,range(1,32)),
					"startday": findWeekday(str(year)+"-04-01")["weekday"],
					"numberofweeks":range(numberOfWeeks(31,findWeekday(str(year)+"-04-01")["daynum"])),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="april").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-04-01")["daynum"]),findWeekday(str(year)+"-04-01")["daynum"],31)
				},
				"may":{
					"length":range(1,32),
					"completed":minutesCompleteActivities("may",year,range(1,32)),
					"categorygrouped":activitiesGroupedByCategory("may",year,range(1,32)),
					"startday": findWeekday(str(year)+"-05-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-05-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="may").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-05-01")["daynum"]),findWeekday(str(year)+"-05-01")["daynum"],31)
				},
				"june":{
					"length":range(1,31),
					"completed":minutesCompleteActivities("june",year,range(1,31)),
					"categorygrouped":activitiesGroupedByCategory("june",year,range(1,31)),
					"startday": findWeekday(str(year)+"-06-01")["weekday"],
					"numberofweeks":numberOfWeeks(30,findWeekday(str(year)+"-06-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="june").order_by("day"),numberOfWeeks(30,findWeekday(str(year)+"-06-01")["daynum"]),findWeekday(str(year)+"-06-01")["daynum"],30)
				},
				"july":{
					"length":range(1,32),
					"completed":minutesCompleteActivities("july",year,range(1,32)),
					"categorygrouped":activitiesGroupedByCategory("july",year,range(1,32)),
					"startday": findWeekday(str(year)+"-07-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-07-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="july").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-07-01")["daynum"]),findWeekday(str(year)+"-07-01")["daynum"],31)
				},
				"august":{
					"length":range(1,32),
					"completed":minutesCompleteActivities("august",year,range(1,32)),
					"categorygrouped":activitiesGroupedByCategory("august",year,range(1,32)),
					"startday": findWeekday(str(year)+"-08-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-08-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="august").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-08-01")["daynum"]),findWeekday(str(year)+"-08-01")["daynum"],31)
				},
				"september":{
					"length":range(1,31),
					"completed":minutesCompleteActivities("september",year,range(1,31)),
					"categorygrouped":activitiesGroupedByCategory("september",year,range(1,31)),
					"startday": findWeekday(str(year)+"-09-01")["weekday"],
					"numberofweeks":numberOfWeeks(30,findWeekday(str(year)+"-09-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="september").order_by("day"),numberOfWeeks(30,findWeekday(str(year)+"-09-01")["daynum"]),findWeekday(str(year)+"-09-01")["daynum"],30)
				},
				"october":{
					"length":range(1,32),
					"completed":minutesCompleteActivities("october",year,range(1,32)),
					"categorygrouped":activitiesGroupedByCategory("october",year,range(1,32)),
					"startday": findWeekday(str(year)+"-10-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-10-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="october").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-10-01")["daynum"]),findWeekday(str(year)+"-10-01")["daynum"],31)
				},
				"november":{
					"length":range(1,31),
					"completed":minutesCompleteActivities("november",year,range(1,31)),
					"categorygrouped":activitiesGroupedByCategory("november",year,range(1,31)),
					"startday": findWeekday(str(year)+"-11-01")["weekday"],
					"numberofweeks":numberOfWeeks(30,findWeekday(str(year)+"-11-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="november").order_by("day"),numberOfWeeks(30,findWeekday(str(year)+"-11-01")["daynum"]),findWeekday(str(year)+"-11-01")["daynum"],30)
				},
				"december":{
					"length":range(1,32),
					"completed":minutesCompleteActivities("december",year,range(1,32)),
					"categorygrouped":activitiesGroupedByCategory("december",year,range(1,32)),
					"startday": findWeekday(str(year)+"-12-01")["weekday"],
					"numberofweeks":numberOfWeeks(31,findWeekday(str(year)+"-12-01")["daynum"]),
					"eachweek": whereTheDatesGo(Date.objects.all().filter(year=year,month="december").order_by("day"),numberOfWeeks(31,findWeekday(str(year)+"-12-01")["daynum"]),findWeekday(str(year)+"-12-01")["daynum"],31)
				}
			}
			yearobj = {str(year): yearlydates}
			years.append(yearobj)
	
	#year=[january,february,march,april,may,june,july,august,september,october,november,december]
	monthlist=["january","february","march","april","may","june","july","august","september","october","november","december"]
	#need something for leap year

	#grab all activities within a month
	monthact = Activity.objects.filter(activity_date__month="june",activity_date__year=2020).order_by("activity_date__day")
	#for each in monthact:
		
	
	context={}
	context["years"]=years
	
	return render(request,"planner/dashboard.html",context)
	
# used for dashboard visualizations
def activitiesGroupedByCategory(month,year,length):
	#grab all activities during a month
	activitybymonth = Activity.objects.filter(activity_date__month=month,activity_date__year=year).order_by("activity_date__day")
	days={}
	
	
	for i in length:
		dailyacts = Activity.objects.filter(activity_date__month=month,activity_date__day=i,activity_date__year=year).order_by("category")
		category={}
	#for each day in the month, sort activities by category and count number of activites belonging to that category.
		for activity in dailyacts:
			if activity.category.category not in category.keys():
				category[activity.category.category]={"count":0, "color":activity.color}

			category[activity.category.category]["count"]+=1
			
		days[i]=category
	#days[1]=["fun":5,"misc":3,"homework":2]..etc

	return days


#takes in all activities in a month, outputs a list of day objects with first object == first day of month and last object == last day of month:
#[{},{},{},{},{},{},{},]
# {
# 
# completed activities
# incomplete activities
# }
# used for dashboard visualizations
def minutesCompleteActivities(month,year,length):
	focus=None
	
	day={}
	monthact = Activity.objects.filter(activity_date__month=month,activity_date__year=year).order_by("activity_date__day")
	#grab all activities with the same month and day
	
	for i in length:
		
		#orderby is just alphabetical order for names
		dailyacts = Activity.objects.filter(activity_date__month=month,activity_date__day=i,activity_date__year=year).order_by("name")
		#turn daily activity list and determine complete and incomplete activites
		#month[activityname]={
		# 						duration
		# 						current_time
		# 						count
		# 				}
		day[i]={}
		for activity in dailyacts:
			dur = activity.duration.split(":")
			durationhr,durationmin,durationsec = int(dur[0]), int(dur[1]), int(dur[2])
			cur = activity.current_time.split(":")
			currenthr,currentmin,currentsec = int(cur[0]), int(cur[1]), int(cur[2])
			totaldurationsec = (durationhr*60*60) + (durationmin*60) + (durationsec)
			totalcurrentsec = (currenthr*60*60) + (currentmin*60) + (currentsec)
			minutescomplete = totalcurrentsec/60
			day[i][activity.name]={"minutescomplete":minutescomplete,"color":activity.color}
	
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
# outputs an object detailing several properties for a specific date
# used internally for multiple function calls within this application
def findWeekday(date):
	#day of the week implementation#
	
	dotw = ["mon","tue","wed","thu","fri","sat","sun"]
	processdate = date.split("-")
	year = processdate[0]
	month = processdate[1]
	day = processdate[2]
	
	day = datetime.datetime.strptime("{} {} {}".format(day,month,year), "%d %m %Y").weekday()
	if int(month)==1:
		month="january"
	elif int(month)==2:
		month="february"
	elif int(month)==3:
		month="march"
	elif int(month)==4:
		month="april"
	elif int(month)==5:
		month="may"
	elif int(month)==6:
		month="june"
	elif int(month)==7:
		month="july"
	elif int(month)==8:
		month="august"
	elif int(month)==9:
		month="september"
	elif int(month)==10:
		month="october"
	elif int(month)==11:
		month="november"
	elif int(month)==12:
		month="december"
	
	
	return {
		"month":month,
		"day":int(processdate[2]),
		"year": int(year),
		"weekday":dotw[day],
		"daynum":day,
		"date":date
	}

# retrieves all activities within a specific month
def getMonthlyActivities(month,year):
	monthact = Date.objects.filter(month=month,year=year).order_by("day")
	#for each in monthact:
	#	print(each.day)
	return monthact

# used for visual formatting of calandar
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
	#changes from ["mon","tue","wed","thu","fri","sat","sun"] definition to ["sun","mon","tue","wed","thu","fri","sat"]
	exists=None
	if firstdotm==6:
		firstdotm=0
	elif firstdotm<=5:
		firstdotm+=1
	else:
		return None
	week = ["sun","mon","tue","wed","thu","fri","sat"]
	offset = 7-firstdotm
	#problem: move dates to appropriate weeks based on starting day of month;; needs some kind of offset
	week1=dates.filter(day__lte=offset)#add to day values the offset to alter week positions for the dates
	week2= dates.filter(day__gte=offset+1).filter(day__lte=offset+7)
	week3= dates.filter(day__gte=offset+8).filter(day__lte=offset+14)
	week4= dates.filter(day__gte=offset+15).filter(day__lte=offset+21)
	week5=None
	week6=None
	if monthlength>=28:
		week5= dates.filter(day__gte=offset+22).filter(day__lte=offset+28)
		week6= dates.filter(day__gte=offset+29)
	if week1 or week2 or week3 or week4 or week5 or week6:
		exists={1:1}
	return{
		"exists":exists,
		"week1": week1,
		"week2": week2,
		"week3": week3,
		"week4": week4,
		"week5": week5,
		"week6": week6
	}
# outputs a valid string representation of any date specified
def formatDateToString(currentmonth,currentday,currentyear):
	if currentmonth<10:
		monthstring = "0{}".format(currentmonth)
	else:
		monthstring=currentmonth
	if currentday<10:
		daystring="0{}".format(currentday)
	else:
		daystring=currentday
	date= "{}-{}-{}".format(currentyear,monthstring,daystring)
	dateinfo = findWeekday(date)
	return dateinfo

# ===================== #
### CALENDAR CONTROLS ###
# ===================== #
# vvvvvvvvvvvvvvvvvvvvv #

def changeDays(request,dateid="",choice=""):
	current = Date.objects.get(id=dateid)
	#redirectpath is set to current date object
	redirectpath = "/date/{}".format(dateid)
	datesorted=[]
	dates = Date.objects.order_by("date")#("year","-month","day")
	for obj in dates:
		datesorted.append(obj)
	for idx in range(len(datesorted)):
		#current date is found in the ordered list
		if datesorted[idx].date == current.date:
			if choice=="prev":
				#previous selected and idx must be greater than 0 for previous date to exist
				if not idx==0:
					redirectpath = "/date/{}".format(datesorted[idx-1].id)
			if choice=="next":
				#next selected and idx must be less than list size for next date to exist
				if not idx==len(datesorted)-1:
					redirectpath = "/date/{}".format(datesorted[idx+1].id)
	return redirect(redirectpath)

	
# determines where last day of month is on calendar
def isLastDayOfMonth(yearobj,months,month,day):
	
	monthnumber = months[month]
	totaldays = yearobj[monthnumber]
	if int(totaldays)==int(day):
		return True
	return False

def getPreviousMonthNumber(months,month):
	
	monthnumber = months[month]
	if int(monthnumber) == 1:
		return 12
	return int(monthnumber)-1

def getNextMonthNumber(months,month):
	monthnumber = months[month]
	if int(monthnumber) == 12:
		return 1
	return int(monthnumber)+1

def processPOST(post):
	if post:
		incomingdata={}
		print('inside func',post)
		incomingdata = querydict_to_dict(post)
		return incomingdata
	#post parameter is empty, will return None type result
	return None

def querydict_to_dict(query_dict):
    data = {}
    for key in query_dict.keys():
        v = query_dict.getlist(key)
        if len(v) == 1:
            v = v[0]
        data[key] = v
    return data

#def editSnooze(dateid):

