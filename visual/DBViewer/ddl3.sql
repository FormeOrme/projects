-- Drop table

-- DROP TABLE public.account_

CREATE TABLE public.account_ (
	mvccversion int8 NOT NULL DEFAULT 0,
	accountid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	parentaccountid int8 NULL,
	name varchar(75) NULL,
	legalname varchar(75) NULL,
	legalid varchar(75) NULL,
	legaltype varchar(75) NULL,
	siccode varchar(75) NULL,
	tickersymbol varchar(75) NULL,
	industry varchar(75) NULL,
	type_ varchar(75) NULL,
	size_ varchar(75) NULL,
	CONSTRAINT account__pkey PRIMARY KEY (accountid)
);

-- Drop table

-- DROP TABLE public.address

CREATE TABLE public.address (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	addressid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	street1 varchar(75) NULL,
	street2 varchar(75) NULL,
	street3 varchar(75) NULL,
	city varchar(75) NULL,
	zip varchar(75) NULL,
	regionid int8 NULL,
	countryid int8 NULL,
	typeid int8 NULL,
	mailing bool NULL,
	primary_ bool NULL,
	CONSTRAINT address_pkey PRIMARY KEY (addressid)
);
CREATE INDEX ix_5bc8b0d4 ON public.address USING btree (userid);
CREATE INDEX ix_8fcb620e ON public.address USING btree (uuid_, companyid);
CREATE INDEX ix_9226dbb4 ON public.address USING btree (companyid, classnameid, classpk, primary_);
CREATE INDEX ix_923bd178 ON public.address USING btree (companyid, classnameid, classpk, mailing);

-- Drop table

-- DROP TABLE public.amimageentry

CREATE TABLE public.amimageentry (
	uuid_ varchar(75) NULL,
	amimageentryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	createdate timestamp NULL,
	configurationuuid varchar(75) NULL,
	fileversionid int8 NULL,
	mimetype varchar(75) NULL,
	height int4 NULL,
	width int4 NULL,
	size_ int8 NULL,
	CONSTRAINT amimageentry_pkey PRIMARY KEY (amimageentryid)
);
CREATE INDEX ix_257f1ddd ON public.amimageentry USING btree (uuid_, companyid);
CREATE INDEX ix_65ab1ea1 ON public.amimageentry USING btree (groupid);
CREATE INDEX ix_868e8c82 ON public.amimageentry USING btree (companyid, configurationuuid);
CREATE UNIQUE INDEX ix_a0ff779f ON public.amimageentry USING btree (uuid_, groupid);
CREATE UNIQUE INDEX ix_c1ee916f ON public.amimageentry USING btree (configurationuuid, fileversionid);
CREATE INDEX ix_e879919e ON public.amimageentry USING btree (fileversionid);

-- Drop table

-- DROP TABLE public.announcementsdelivery

CREATE TABLE public.announcementsdelivery (
	deliveryid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	type_ varchar(75) NULL,
	email bool NULL,
	sms bool NULL,
	website bool NULL,
	CONSTRAINT announcementsdelivery_pkey PRIMARY KEY (deliveryid)
);
CREATE UNIQUE INDEX ix_ba4413d5 ON public.announcementsdelivery USING btree (userid, type_);

-- Drop table

-- DROP TABLE public.announcementsentry

CREATE TABLE public.announcementsentry (
	uuid_ varchar(75) NULL,
	entryid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	title varchar(75) NULL,
	"content" text NULL,
	url text NULL,
	type_ varchar(75) NULL,
	displaydate timestamp NULL,
	expirationdate timestamp NULL,
	priority int4 NULL,
	alert bool NULL,
	CONSTRAINT announcementsentry_pkey PRIMARY KEY (entryid)
);
CREATE INDEX ix_14f06a6b ON public.announcementsentry USING btree (classnameid, classpk, alert);
CREATE INDEX ix_459be01b ON public.announcementsentry USING btree (companyid, classnameid, classpk, alert);
CREATE INDEX ix_d49c2e66 ON public.announcementsentry USING btree (userid);
CREATE INDEX ix_f2949120 ON public.announcementsentry USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.announcementsflag

CREATE TABLE public.announcementsflag (
	flagid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	createdate timestamp NULL,
	entryid int8 NULL,
	value int4 NULL,
	CONSTRAINT announcementsflag_pkey PRIMARY KEY (flagid)
);
CREATE UNIQUE INDEX ix_4539a99c ON public.announcementsflag USING btree (userid, entryid, value);
CREATE INDEX ix_9c7eb9f ON public.announcementsflag USING btree (entryid);

-- Drop table

-- DROP TABLE public.assetcategory

CREATE TABLE public.assetcategory (
	uuid_ varchar(75) NULL,
	externalreferencecode varchar(75) NULL,
	categoryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	parentcategoryid int8 NULL,
	leftcategoryid int8 NULL,
	rightcategoryid int8 NULL,
	name varchar(75) NULL,
	title text NULL,
	description text NULL,
	vocabularyid int8 NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT assetcategory_pkey PRIMARY KEY (categoryid)
);
CREATE INDEX ix_2008facb ON public.assetcategory USING btree (groupid, vocabularyid);
CREATE INDEX ix_287b1f89 ON public.assetcategory USING btree (vocabularyid);
CREATE INDEX ix_852ea801 ON public.assetcategory USING btree (groupid, parentcategoryid, name, vocabularyid);
CREATE INDEX ix_85e3bb49 ON public.assetcategory USING btree (companyid, externalreferencecode);
CREATE INDEX ix_87603842 ON public.assetcategory USING btree (groupid, parentcategoryid, vocabularyid);
CREATE INDEX ix_b185e980 ON public.assetcategory USING btree (parentcategoryid, vocabularyid);
CREATE INDEX ix_bbaf6928 ON public.assetcategory USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_be4df2bf ON public.assetcategory USING btree (parentcategoryid, name, vocabularyid);
CREATE INDEX ix_c7f39fca ON public.assetcategory USING btree (groupid, name, vocabularyid);
CREATE INDEX ix_d61abe08 ON public.assetcategory USING btree (name, vocabularyid);
CREATE UNIQUE INDEX ix_e8d019aa ON public.assetcategory USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.assetcategoryproperty

CREATE TABLE public.assetcategoryproperty (
	categorypropertyid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	categoryid int8 NULL,
	key_ varchar(75) NULL,
	value varchar(75) NULL,
	CONSTRAINT assetcategoryproperty_pkey PRIMARY KEY (categorypropertyid)
);
CREATE INDEX ix_52340033 ON public.assetcategoryproperty USING btree (companyid, key_);
CREATE UNIQUE INDEX ix_dbd111aa ON public.assetcategoryproperty USING btree (categoryid, key_);

-- Drop table

-- DROP TABLE public.assetdisplaypageentry

CREATE TABLE public.assetdisplaypageentry (
	uuid_ varchar(75) NULL,
	assetdisplaypageentryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	layoutpagetemplateentryid int8 NULL,
	type_ int4 NULL,
	CONSTRAINT assetdisplaypageentry_pkey PRIMARY KEY (assetdisplaypageentryid)
);
CREATE INDEX ix_1da6952b ON public.assetdisplaypageentry USING btree (uuid_, companyid);
CREATE INDEX ix_31fa120c ON public.assetdisplaypageentry USING btree (classnameid, classpk);
CREATE UNIQUE INDEX ix_a21fc9a8 ON public.assetdisplaypageentry USING btree (groupid, classnameid, classpk);
CREATE INDEX ix_bfb8a913 ON public.assetdisplaypageentry USING btree (layoutpagetemplateentryid);
CREATE UNIQUE INDEX ix_db986a6d ON public.assetdisplaypageentry USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.assetentries_assetcategories

CREATE TABLE public.assetentries_assetcategories (
	companyid int8 NOT NULL,
	categoryid int8 NOT NULL,
	entryid int8 NOT NULL,
	CONSTRAINT assetentries_assetcategories_pkey PRIMARY KEY (categoryid, entryid)
);
CREATE INDEX ix_38a65b55 ON public.assetentries_assetcategories USING btree (companyid);
CREATE INDEX ix_a188f560 ON public.assetentries_assetcategories USING btree (categoryid);
CREATE INDEX ix_e119938a ON public.assetentries_assetcategories USING btree (entryid);

-- Drop table

-- DROP TABLE public.assetentries_assettags

CREATE TABLE public.assetentries_assettags (
	companyid int8 NOT NULL,
	entryid int8 NOT NULL,
	tagid int8 NOT NULL,
	CONSTRAINT assetentries_assettags_pkey PRIMARY KEY (entryid, tagid)
);
CREATE INDEX ix_112337b8 ON public.assetentries_assettags USING btree (companyid);
CREATE INDEX ix_2ed82cad ON public.assetentries_assettags USING btree (entryid);
CREATE INDEX ix_b2a61b55 ON public.assetentries_assettags USING btree (tagid);

-- Drop table

-- DROP TABLE public.assetentry

CREATE TABLE public.assetentry (
	entryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	classuuid varchar(75) NULL,
	classtypeid int8 NULL,
	listable bool NULL,
	visible bool NULL,
	startdate timestamp NULL,
	enddate timestamp NULL,
	publishdate timestamp NULL,
	expirationdate timestamp NULL,
	mimetype varchar(75) NULL,
	title text NULL,
	description text NULL,
	summary text NULL,
	url text NULL,
	layoutuuid varchar(75) NULL,
	height int4 NULL,
	width int4 NULL,
	priority float8 NULL,
	viewcount int4 NULL,
	CONSTRAINT assetentry_pkey PRIMARY KEY (entryid)
);
CREATE UNIQUE INDEX ix_1e9d371d ON public.assetentry USING btree (classnameid, classpk);
CREATE INDEX ix_1eba6821 ON public.assetentry USING btree (groupid, classuuid);
CREATE INDEX ix_2e4e3885 ON public.assetentry USING btree (publishdate);
CREATE INDEX ix_6418bb52 ON public.assetentry USING btree (groupid, classnameid, publishdate, expirationdate);
CREATE INDEX ix_7306c60 ON public.assetentry USING btree (companyid);
CREATE INDEX ix_75d42ff9 ON public.assetentry USING btree (expirationdate);
CREATE INDEX ix_82c4bef6 ON public.assetentry USING btree (groupid, classnameid, visible);
CREATE INDEX ix_9029e15a ON public.assetentry USING btree (visible);
CREATE INDEX ix_fec4a201 ON public.assetentry USING btree (layoutuuid);

-- Drop table

-- DROP TABLE public.assetentryassetcategoryrel

CREATE TABLE public.assetentryassetcategoryrel (
	assetentryassetcategoryrelid int8 NOT NULL,
	assetentryid int8 NULL,
	assetcategoryid int8 NULL,
	priority int4 NULL,
	CONSTRAINT assetentryassetcategoryrel_pkey PRIMARY KEY (assetentryassetcategoryrelid)
);
CREATE INDEX ix_19ec1746 ON public.assetentryassetcategoryrel USING btree (assetcategoryid);
CREATE INDEX ix_cb3e2b64 ON public.assetentryassetcategoryrel USING btree (assetentryid);

-- Drop table

-- DROP TABLE public.assetlink

CREATE TABLE public.assetlink (
	linkid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	entryid1 int8 NULL,
	entryid2 int8 NULL,
	type_ int4 NULL,
	weight int4 NULL,
	CONSTRAINT assetlink_pkey PRIMARY KEY (linkid)
);
CREATE INDEX ix_14d5a20d ON public.assetlink USING btree (entryid1, type_);
CREATE UNIQUE INDEX ix_8f542794 ON public.assetlink USING btree (entryid1, entryid2, type_);
CREATE INDEX ix_91f132c ON public.assetlink USING btree (entryid2, type_);

-- Drop table

-- DROP TABLE public.assettag

CREATE TABLE public.assettag (
	uuid_ varchar(75) NULL,
	tagid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name varchar(75) NULL,
	assetcount int4 NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT assettag_pkey PRIMARY KEY (tagid)
);
CREATE INDEX ix_84c501e4 ON public.assettag USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_b6acb166 ON public.assettag USING btree (uuid_, groupid);
CREATE INDEX ix_c43137af ON public.assettag USING btree (name);
CREATE UNIQUE INDEX ix_d63322f9 ON public.assettag USING btree (groupid, name);

-- Drop table

-- DROP TABLE public.assettagstats

CREATE TABLE public.assettagstats (
	tagstatsid int8 NOT NULL,
	companyid int8 NULL,
	tagid int8 NULL,
	classnameid int8 NULL,
	assetcount int4 NULL,
	CONSTRAINT assettagstats_pkey PRIMARY KEY (tagstatsid)
);
CREATE INDEX ix_50702693 ON public.assettagstats USING btree (classnameid);
CREATE UNIQUE INDEX ix_56682cc4 ON public.assettagstats USING btree (tagid, classnameid);

-- Drop table

-- DROP TABLE public.assetvocabulary

CREATE TABLE public.assetvocabulary (
	uuid_ varchar(75) NULL,
	externalreferencecode varchar(75) NULL,
	vocabularyid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name varchar(75) NULL,
	title text NULL,
	description text NULL,
	settings_ text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT assetvocabulary_pkey PRIMARY KEY (vocabularyid)
);
CREATE UNIQUE INDEX ix_1b2b8792 ON public.assetvocabulary USING btree (uuid_, groupid);
CREATE UNIQUE INDEX ix_c0aad74d ON public.assetvocabulary USING btree (groupid, name);
CREATE INDEX ix_c4e6fd10 ON public.assetvocabulary USING btree (uuid_, companyid);
CREATE INDEX ix_e5867f31 ON public.assetvocabulary USING btree (companyid, externalreferencecode);

-- Drop table

-- DROP TABLE public.audit_auditevent

CREATE TABLE public.audit_auditevent (
	auditeventid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	eventtype varchar(75) NULL,
	classname varchar(200) NULL,
	classpk varchar(75) NULL,
	message text NULL,
	clienthost varchar(255) NULL,
	clientip varchar(75) NULL,
	servername varchar(255) NULL,
	serverport int4 NULL,
	sessionid varchar(255) NULL,
	additionalinfo text NULL,
	CONSTRAINT audit_auditevent_pkey PRIMARY KEY (auditeventid)
);
CREATE INDEX ix_8fe31edf ON public.audit_auditevent USING btree (companyid);

-- Drop table

-- DROP TABLE public.backgroundtask

CREATE TABLE public.backgroundtask (
	mvccversion int8 NOT NULL DEFAULT 0,
	backgroundtaskid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name varchar(255) NULL,
	servletcontextnames varchar(255) NULL,
	taskexecutorclassname varchar(200) NULL,
	taskcontextmap text NULL,
	completed bool NULL,
	completiondate timestamp NULL,
	status int4 NULL,
	statusmessage text NULL,
	CONSTRAINT backgroundtask_pkey PRIMARY KEY (backgroundtaskid)
);
CREATE INDEX ix_2fcfe748 ON public.backgroundtask USING btree (taskexecutorclassname, status);
CREATE INDEX ix_579c63b0 ON public.backgroundtask USING btree (groupid, name, taskexecutorclassname, completed);
CREATE INDEX ix_75638cdf ON public.backgroundtask USING btree (status);
CREATE INDEX ix_7a9ff471 ON public.backgroundtask USING btree (groupid, taskexecutorclassname, completed);
CREATE INDEX ix_7e757d70 ON public.backgroundtask USING btree (groupid, taskexecutorclassname, status);
CREATE INDEX ix_c5a6c78f ON public.backgroundtask USING btree (companyid);
CREATE INDEX ix_c71c3b7 ON public.backgroundtask USING btree (groupid, status);
CREATE INDEX ix_fbf5faa2 ON public.backgroundtask USING btree (completed);

-- Drop table

-- DROP TABLE public.blogsentry

CREATE TABLE public.blogsentry (
	uuid_ varchar(75) NULL,
	entryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	title varchar(150) NULL,
	subtitle text NULL,
	urltitle varchar(255) NULL,
	description text NULL,
	"content" text NULL,
	displaydate timestamp NULL,
	allowpingbacks bool NULL,
	allowtrackbacks bool NULL,
	trackbacks text NULL,
	coverimagecaption text NULL,
	coverimagefileentryid int8 NULL,
	coverimageurl text NULL,
	smallimage bool NULL,
	smallimagefileentryid int8 NULL,
	smallimageid int8 NULL,
	smallimageurl text NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT blogsentry_pkey PRIMARY KEY (entryid)
);
CREATE UNIQUE INDEX ix_1b1040fd ON public.blogsentry USING btree (uuid_, groupid);
CREATE INDEX ix_1efd8ee9 ON public.blogsentry USING btree (groupid, status);
CREATE INDEX ix_2672f77f ON public.blogsentry USING btree (displaydate, status);
CREATE INDEX ix_49e15a23 ON public.blogsentry USING btree (groupid, userid, status);
CREATE INDEX ix_5e8307bb ON public.blogsentry USING btree (uuid_, companyid);
CREATE INDEX ix_a5f57b61 ON public.blogsentry USING btree (companyid, userid, status);
CREATE INDEX ix_bb0c2905 ON public.blogsentry USING btree (companyid, displaydate, status);
CREATE INDEX ix_da04f689 ON public.blogsentry USING btree (groupid, userid, displaydate, status);
CREATE UNIQUE INDEX ix_db780a20 ON public.blogsentry USING btree (groupid, urltitle);
CREATE INDEX ix_eb2dce27 ON public.blogsentry USING btree (companyid, status);
CREATE INDEX ix_f0e73383 ON public.blogsentry USING btree (groupid, displaydate, status);

-- Drop table

-- DROP TABLE public.blogsstatsuser

CREATE TABLE public.blogsstatsuser (
	statsuserid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	entrycount int4 NULL,
	lastpostdate timestamp NULL,
	ratingstotalentries int4 NULL,
	ratingstotalscore float8 NULL,
	ratingsaveragescore float8 NULL,
	CONSTRAINT blogsstatsuser_pkey PRIMARY KEY (statsuserid)
);
CREATE INDEX ix_28c78d5c ON public.blogsstatsuser USING btree (groupid, entrycount);
CREATE INDEX ix_507ba031 ON public.blogsstatsuser USING btree (userid, lastpostdate);
CREATE UNIQUE INDEX ix_82254c25 ON public.blogsstatsuser USING btree (groupid, userid);
CREATE INDEX ix_90cda39a ON public.blogsstatsuser USING btree (companyid, entrycount);

-- Drop table

-- DROP TABLE public.browsertracker

CREATE TABLE public.browsertracker (
	mvccversion int8 NOT NULL DEFAULT 0,
	browsertrackerid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	browserkey int8 NULL,
	CONSTRAINT browsertracker_pkey PRIMARY KEY (browsertrackerid)
);
CREATE UNIQUE INDEX ix_e7b95510 ON public.browsertracker USING btree (userid);

-- Drop table

-- DROP TABLE public.calendar

CREATE TABLE public.calendar (
	uuid_ varchar(75) NULL,
	calendarid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	calendarresourceid int8 NULL,
	name text NULL,
	description text NULL,
	timezoneid varchar(75) NULL,
	color int4 NULL,
	defaultcalendar bool NULL,
	enablecomments bool NULL,
	enableratings bool NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT calendar_pkey PRIMARY KEY (calendarid)
);
CREATE UNIQUE INDEX ix_3ae311a ON public.calendar USING btree (uuid_, groupid);
CREATE INDEX ix_97656498 ON public.calendar USING btree (uuid_, companyid);
CREATE INDEX ix_97fc174e ON public.calendar USING btree (groupid, calendarresourceid, defaultcalendar);

-- Drop table

-- DROP TABLE public.calendarbooking

CREATE TABLE public.calendarbooking (
	uuid_ varchar(75) NULL,
	calendarbookingid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	calendarid int8 NULL,
	calendarresourceid int8 NULL,
	parentcalendarbookingid int8 NULL,
	recurringcalendarbookingid int8 NULL,
	veventuid varchar(255) NULL,
	title text NULL,
	description text NULL,
	"location" text NULL,
	starttime int8 NULL,
	endtime int8 NULL,
	allday bool NULL,
	recurrence text NULL,
	firstreminder int8 NULL,
	firstremindertype varchar(75) NULL,
	secondreminder int8 NULL,
	secondremindertype varchar(75) NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT calendarbooking_pkey PRIMARY KEY (calendarbookingid)
);
CREATE UNIQUE INDEX ix_113a264e ON public.calendarbooking USING btree (calendarid, parentcalendarbookingid);
CREATE INDEX ix_14adc52e ON public.calendarbooking USING btree (recurringcalendarbookingid);
CREATE INDEX ix_470170b4 ON public.calendarbooking USING btree (calendarid, status);
CREATE UNIQUE INDEX ix_8b23da0e ON public.calendarbooking USING btree (calendarid, veventuid);
CREATE INDEX ix_a21d9fd5 ON public.calendarbooking USING btree (uuid_, companyid);
CREATE INDEX ix_b198ffc ON public.calendarbooking USING btree (calendarresourceid);
CREATE UNIQUE INDEX ix_f4c61797 ON public.calendarbooking USING btree (uuid_, groupid);
CREATE INDEX ix_f7b8a941 ON public.calendarbooking USING btree (parentcalendarbookingid, status);

-- Drop table

-- DROP TABLE public.calendarnotificationtemplate

CREATE TABLE public.calendarnotificationtemplate (
	uuid_ varchar(75) NULL,
	calendarnotificationtemplateid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	calendarid int8 NULL,
	notificationtype varchar(75) NULL,
	notificationtypesettings varchar(75) NULL,
	notificationtemplatetype varchar(75) NULL,
	subject varchar(75) NULL,
	body text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT calendarnotificationtemplate_pkey PRIMARY KEY (calendarnotificationtemplateid)
);
CREATE UNIQUE INDEX ix_4012e97f ON public.calendarnotificationtemplate USING btree (uuid_, groupid);
CREATE INDEX ix_4d7d97bd ON public.calendarnotificationtemplate USING btree (uuid_, companyid);
CREATE INDEX ix_7727a482 ON public.calendarnotificationtemplate USING btree (calendarid, notificationtype, notificationtemplatetype);

-- Drop table

-- DROP TABLE public.calendarresource

CREATE TABLE public.calendarresource (
	uuid_ varchar(75) NULL,
	calendarresourceid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	classuuid varchar(75) NULL,
	code_ varchar(75) NULL,
	name text NULL,
	description text NULL,
	active_ bool NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT calendarresource_pkey PRIMARY KEY (calendarresourceid)
);
CREATE UNIQUE INDEX ix_16a12327 ON public.calendarresource USING btree (classnameid, classpk);
CREATE INDEX ix_40678371 ON public.calendarresource USING btree (groupid, active_);
CREATE INDEX ix_4470a59d ON public.calendarresource USING btree (companyid, code_, active_);
CREATE UNIQUE INDEX ix_4abd2bc8 ON public.calendarresource USING btree (uuid_, groupid);
CREATE INDEX ix_55c2f8aa ON public.calendarresource USING btree (groupid, code_);
CREATE INDEX ix_56a06bc6 ON public.calendarresource USING btree (uuid_, companyid);
CREATE INDEX ix_76ddd0f7 ON public.calendarresource USING btree (active_);

-- Drop table

-- DROP TABLE public.changesetcollection

CREATE TABLE public.changesetcollection (
	changesetcollectionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name varchar(75) NULL,
	description varchar(75) NULL,
	CONSTRAINT changesetcollection_pkey PRIMARY KEY (changesetcollectionid)
);
CREATE INDEX ix_9ac55e11 ON public.changesetcollection USING btree (companyid, name);
CREATE UNIQUE INDEX ix_abeee793 ON public.changesetcollection USING btree (groupid, name);
CREATE INDEX ix_ee4b4b0e ON public.changesetcollection USING btree (groupid, userid);

-- Drop table

-- DROP TABLE public.changesetentry

CREATE TABLE public.changesetentry (
	changesetentryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	changesetcollectionid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	CONSTRAINT changesetentry_pkey PRIMARY KEY (changesetentryid)
);
CREATE INDEX ix_4a5b2d2a ON public.changesetentry USING btree (groupid, classnameid);
CREATE INDEX ix_ceb6afa2 ON public.changesetentry USING btree (companyid);
CREATE UNIQUE INDEX ix_ef48912a ON public.changesetentry USING btree (changesetcollectionid, classnameid, classpk);

-- Drop table

-- DROP TABLE public.classname_

CREATE TABLE public.classname_ (
	mvccversion int8 NOT NULL DEFAULT 0,
	classnameid int8 NOT NULL,
	value varchar(200) NULL,
	CONSTRAINT classname__pkey PRIMARY KEY (classnameid)
);
CREATE UNIQUE INDEX ix_b27a301f ON public.classname_ USING btree (value);

-- Drop table

-- DROP TABLE public.clustergroup

CREATE TABLE public.clustergroup (
	mvccversion int8 NOT NULL DEFAULT 0,
	clustergroupid int8 NOT NULL,
	name varchar(75) NULL,
	clusternodeids varchar(75) NULL,
	wholecluster bool NULL,
	CONSTRAINT clustergroup_pkey PRIMARY KEY (clustergroupid)
);

-- Drop table

-- DROP TABLE public.company

CREATE TABLE public.company (
	mvccversion int8 NOT NULL DEFAULT 0,
	companyid int8 NOT NULL,
	accountid int8 NULL,
	webid varchar(75) NULL,
	key_ text NULL,
	mx varchar(200) NULL,
	homeurl text NULL,
	logoid int8 NULL,
	"system" bool NULL,
	maxusers int4 NULL,
	active_ bool NULL,
	CONSTRAINT company_pkey PRIMARY KEY (companyid)
);
CREATE INDEX ix_12566ec2 ON public.company USING btree (mx);
CREATE INDEX ix_35e3e7c6 ON public.company USING btree (system);
CREATE INDEX ix_38efe3fd ON public.company USING btree (logoid);
CREATE UNIQUE INDEX ix_ec00543c ON public.company USING btree (webid);

-- Drop table

-- DROP TABLE public.configuration_

CREATE TABLE public.configuration_ (
	configurationid varchar(255) NOT NULL,
	"dictionary" text NULL,
	CONSTRAINT configuration__pkey PRIMARY KEY (configurationid)
);

-- Drop table

-- DROP TABLE public.contact_

CREATE TABLE public.contact_ (
	mvccversion int8 NOT NULL DEFAULT 0,
	contactid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	accountid int8 NULL,
	parentcontactid int8 NULL,
	emailaddress varchar(254) NULL,
	firstname varchar(75) NULL,
	middlename varchar(75) NULL,
	lastname varchar(75) NULL,
	prefixid int8 NULL,
	suffixid int8 NULL,
	male bool NULL,
	birthday timestamp NULL,
	smssn varchar(75) NULL,
	facebooksn varchar(75) NULL,
	jabbersn varchar(75) NULL,
	skypesn varchar(75) NULL,
	twittersn varchar(75) NULL,
	employeestatusid varchar(75) NULL,
	employeenumber varchar(75) NULL,
	jobtitle varchar(100) NULL,
	jobclass varchar(75) NULL,
	hoursofoperation varchar(75) NULL,
	CONSTRAINT contact__pkey PRIMARY KEY (contactid)
);
CREATE INDEX ix_66d496a3 ON public.contact_ USING btree (companyid);
CREATE INDEX ix_791914fa ON public.contact_ USING btree (classnameid, classpk);
CREATE INDEX ix_b8c28c53 ON public.contact_ USING btree (accountid);

-- Drop table

-- DROP TABLE public.contacts_entry

CREATE TABLE public.contacts_entry (
	entryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	fullname varchar(75) NULL,
	emailaddress varchar(254) NULL,
	"comments" text NULL,
	CONSTRAINT contacts_entry_pkey PRIMARY KEY (entryid)
);
CREATE INDEX ix_c257de32 ON public.contacts_entry USING btree (userid, emailaddress);

-- Drop table

-- DROP TABLE public.counter

CREATE TABLE public.counter (
	name varchar(150) NOT NULL,
	currentid int8 NULL,
	CONSTRAINT counter_pkey PRIMARY KEY (name)
);

-- Drop table

-- DROP TABLE public.country

CREATE TABLE public.country (
	mvccversion int8 NOT NULL DEFAULT 0,
	countryid int8 NOT NULL,
	name varchar(75) NULL,
	a2 varchar(75) NULL,
	a3 varchar(75) NULL,
	number_ varchar(75) NULL,
	idd_ varchar(75) NULL,
	ziprequired bool NULL,
	active_ bool NULL,
	CONSTRAINT country_pkey PRIMARY KEY (countryid)
);
CREATE UNIQUE INDEX ix_19da007b ON public.country USING btree (name);
CREATE INDEX ix_25d734cd ON public.country USING btree (active_);
CREATE UNIQUE INDEX ix_717b97e1 ON public.country USING btree (a2);
CREATE UNIQUE INDEX ix_717b9ba2 ON public.country USING btree (a3);

-- Drop table

-- DROP TABLE public.ddlrecord

CREATE TABLE public.ddlrecord (
	uuid_ varchar(75) NULL,
	recordid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	versionuserid int8 NULL,
	versionusername varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	ddmstorageid int8 NULL,
	recordsetid int8 NULL,
	recordsetversion varchar(75) NULL,
	"version" varchar(75) NULL,
	displayindex int4 NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT ddlrecord_pkey PRIMARY KEY (recordid)
);
CREATE INDEX ix_384ab6f7 ON public.ddlrecord USING btree (uuid_, companyid);
CREATE INDEX ix_6a6c1c85 ON public.ddlrecord USING btree (companyid);
CREATE INDEX ix_aac564d3 ON public.ddlrecord USING btree (recordsetid, userid);
CREATE UNIQUE INDEX ix_b4328f39 ON public.ddlrecord USING btree (uuid_, groupid);
CREATE INDEX ix_f12c61d4 ON public.ddlrecord USING btree (recordsetid, recordsetversion);

-- Drop table

-- DROP TABLE public.ddlrecordset

CREATE TABLE public.ddlrecordset (
	uuid_ varchar(75) NULL,
	recordsetid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	versionuserid int8 NULL,
	versionusername varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	ddmstructureid int8 NULL,
	recordsetkey varchar(75) NULL,
	"version" varchar(75) NULL,
	name text NULL,
	description text NULL,
	mindisplayrows int4 NULL,
	"scope" int4 NULL,
	settings_ text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT ddlrecordset_pkey PRIMARY KEY (recordsetid)
);
CREATE UNIQUE INDEX ix_270ba5e1 ON public.ddlrecordset USING btree (uuid_, groupid);
CREATE UNIQUE INDEX ix_56dab121 ON public.ddlrecordset USING btree (groupid, recordsetkey);
CREATE INDEX ix_5938c39f ON public.ddlrecordset USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.ddlrecordsetversion

CREATE TABLE public.ddlrecordsetversion (
	recordsetversionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	recordsetid int8 NULL,
	ddmstructureversionid int8 NULL,
	name text NULL,
	description text NULL,
	settings_ text NULL,
	"version" varchar(75) NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT ddlrecordsetversion_pkey PRIMARY KEY (recordsetversionid)
);
CREATE INDEX ix_1c4e1cc9 ON public.ddlrecordsetversion USING btree (recordsetid, status);
CREATE UNIQUE INDEX ix_94fc5485 ON public.ddlrecordsetversion USING btree (recordsetid, version);

-- Drop table

-- DROP TABLE public.ddlrecordversion

CREATE TABLE public.ddlrecordversion (
	recordversionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	ddmstorageid int8 NULL,
	recordsetid int8 NULL,
	recordsetversion varchar(75) NULL,
	recordid int8 NULL,
	"version" varchar(75) NULL,
	displayindex int4 NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT ddlrecordversion_pkey PRIMARY KEY (recordversionid)
);
CREATE INDEX ix_19ad75f6 ON public.ddlrecordversion USING btree (recordsetid, recordsetversion);
CREATE INDEX ix_28202a62 ON public.ddlrecordversion USING btree (userid, recordsetid, recordsetversion, status);
CREATE INDEX ix_762adc7 ON public.ddlrecordversion USING btree (recordid, status);
CREATE UNIQUE INDEX ix_c79e347 ON public.ddlrecordversion USING btree (recordid, version);

-- Drop table

-- DROP TABLE public.ddmcontent

CREATE TABLE public.ddmcontent (
	uuid_ varchar(75) NULL,
	contentid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name text NULL,
	description text NULL,
	data_ text NULL,
	CONSTRAINT ddmcontent_pkey PRIMARY KEY (contentid)
);
CREATE INDEX ix_3a9c0626 ON public.ddmcontent USING btree (uuid_, companyid);
CREATE INDEX ix_50bf1038 ON public.ddmcontent USING btree (groupid);
CREATE INDEX ix_e3baf436 ON public.ddmcontent USING btree (companyid);
CREATE UNIQUE INDEX ix_eb9bde28 ON public.ddmcontent USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.ddmdataproviderinstance

CREATE TABLE public.ddmdataproviderinstance (
	uuid_ varchar(75) NULL,
	dataproviderinstanceid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name text NULL,
	description text NULL,
	definition text NULL,
	type_ varchar(75) NULL,
	CONSTRAINT ddmdataproviderinstance_pkey PRIMARY KEY (dataproviderinstanceid)
);
CREATE INDEX ix_1333a2a7 ON public.ddmdataproviderinstance USING btree (groupid);
CREATE UNIQUE INDEX ix_b4e180d9 ON public.ddmdataproviderinstance USING btree (uuid_, groupid);
CREATE INDEX ix_c903c097 ON public.ddmdataproviderinstance USING btree (uuid_, companyid);
CREATE INDEX ix_db54a6e5 ON public.ddmdataproviderinstance USING btree (companyid);

-- Drop table

-- DROP TABLE public.ddmdataproviderinstancelink

CREATE TABLE public.ddmdataproviderinstancelink (
	dataproviderinstancelinkid int8 NOT NULL,
	companyid int8 NULL,
	dataproviderinstanceid int8 NULL,
	structureid int8 NULL,
	CONSTRAINT ddmdataproviderinstancelink_pkey PRIMARY KEY (dataproviderinstancelinkid)
);
CREATE UNIQUE INDEX ix_8c878342 ON public.ddmdataproviderinstancelink USING btree (dataproviderinstanceid, structureid);
CREATE INDEX ix_cb823541 ON public.ddmdataproviderinstancelink USING btree (structureid);

-- Drop table

-- DROP TABLE public.ddmforminstance

CREATE TABLE public.ddmforminstance (
	uuid_ varchar(75) NULL,
	forminstanceid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	versionuserid int8 NULL,
	versionusername varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	structureid int8 NULL,
	"version" varchar(75) NULL,
	name text NULL,
	description text NULL,
	settings_ text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT ddmforminstance_pkey PRIMARY KEY (forminstanceid)
);
CREATE INDEX ix_9e1c31fe ON public.ddmforminstance USING btree (groupid);
CREATE UNIQUE INDEX ix_aa9051a2 ON public.ddmforminstance USING btree (uuid_, groupid);
CREATE INDEX ix_e418320 ON public.ddmforminstance USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.ddmforminstancerecord

CREATE TABLE public.ddmforminstancerecord (
	uuid_ varchar(75) NULL,
	forminstancerecordid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	versionuserid int8 NULL,
	versionusername varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	forminstanceid int8 NULL,
	forminstanceversion varchar(75) NULL,
	storageid int8 NULL,
	"version" varchar(75) NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT ddmforminstancerecord_pkey PRIMARY KEY (forminstancerecordid)
);
CREATE INDEX ix_242301ea ON public.ddmforminstancerecord USING btree (forminstanceid, forminstanceversion);
CREATE INDEX ix_3c8dbdff ON public.ddmforminstancerecord USING btree (forminstanceid, userid);
CREATE INDEX ix_5bc982b ON public.ddmforminstancerecord USING btree (companyid);
CREATE UNIQUE INDEX ix_aa3b6b53 ON public.ddmforminstancerecord USING btree (uuid_, groupid);
CREATE INDEX ix_cf8cf491 ON public.ddmforminstancerecord USING btree (uuid_, companyid);
CREATE INDEX ix_e1971ff ON public.ddmforminstancerecord USING btree (userid, forminstanceid);

-- Drop table

-- DROP TABLE public.ddmforminstancerecordversion

CREATE TABLE public.ddmforminstancerecordversion (
	forminstancerecordversionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	forminstanceid int8 NULL,
	forminstanceversion varchar(75) NULL,
	forminstancerecordid int8 NULL,
	"version" varchar(75) NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	storageid int8 NULL,
	CONSTRAINT ddmforminstancerecordversion_pkey PRIMARY KEY (forminstancerecordversionid)
);
CREATE UNIQUE INDEX ix_26623628 ON public.ddmforminstancerecordversion USING btree (forminstancerecordid, version);
CREATE INDEX ix_57ca016c ON public.ddmforminstancerecordversion USING btree (userid, forminstanceid, forminstanceversion, status);
CREATE INDEX ix_b5a3fac6 ON public.ddmforminstancerecordversion USING btree (forminstancerecordid, status);
CREATE INDEX ix_eaaf6d80 ON public.ddmforminstancerecordversion USING btree (forminstanceid, forminstanceversion);

-- Drop table

-- DROP TABLE public.ddmforminstanceversion

CREATE TABLE public.ddmforminstanceversion (
	forminstanceversionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	forminstanceid int8 NULL,
	structureversionid int8 NULL,
	name text NULL,
	description text NULL,
	settings_ text NULL,
	"version" varchar(75) NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT ddmforminstanceversion_pkey PRIMARY KEY (forminstanceversionid)
);
CREATE UNIQUE INDEX ix_ae51cdc8 ON public.ddmforminstanceversion USING btree (forminstanceid, version);
CREATE INDEX ix_eb92ef26 ON public.ddmforminstanceversion USING btree (forminstanceid, status);

-- Drop table

-- DROP TABLE public.ddmstoragelink

CREATE TABLE public.ddmstoragelink (
	uuid_ varchar(75) NULL,
	storagelinkid int8 NOT NULL,
	companyid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	structureid int8 NULL,
	structureversionid int8 NULL,
	CONSTRAINT ddmstoragelink_pkey PRIMARY KEY (storagelinkid)
);
CREATE INDEX ix_14dada22 ON public.ddmstoragelink USING btree (structureversionid);
CREATE UNIQUE INDEX ix_702d1ad5 ON public.ddmstoragelink USING btree (classpk);
CREATE INDEX ix_81776090 ON public.ddmstoragelink USING btree (structureid);
CREATE INDEX ix_db81eb42 ON public.ddmstoragelink USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.ddmstructure

CREATE TABLE public.ddmstructure (
	uuid_ varchar(75) NULL,
	structureid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	versionuserid int8 NULL,
	versionusername varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	parentstructureid int8 NULL,
	classnameid int8 NULL,
	structurekey varchar(75) NULL,
	"version" varchar(75) NULL,
	name text NULL,
	description text NULL,
	definition text NULL,
	storagetype varchar(75) NULL,
	type_ int4 NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT ddmstructure_pkey PRIMARY KEY (structureid)
);
CREATE INDEX ix_20fde04c ON public.ddmstructure USING btree (structurekey);
CREATE INDEX ix_31817a62 ON public.ddmstructure USING btree (classnameid);
CREATE INDEX ix_43395316 ON public.ddmstructure USING btree (groupid, parentstructureid);
CREATE INDEX ix_4fbac092 ON public.ddmstructure USING btree (companyid, classnameid);
CREATE INDEX ix_657899a8 ON public.ddmstructure USING btree (parentstructureid);
CREATE UNIQUE INDEX ix_85c7ebe2 ON public.ddmstructure USING btree (uuid_, groupid);
CREATE UNIQUE INDEX ix_c8785130 ON public.ddmstructure USING btree (groupid, classnameid, structurekey);
CREATE INDEX ix_f9fb8d60 ON public.ddmstructure USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.ddmstructurelayout

CREATE TABLE public.ddmstructurelayout (
	uuid_ varchar(75) NULL,
	structurelayoutid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	structureversionid int8 NULL,
	definition text NULL,
	CONSTRAINT ddmstructurelayout_pkey PRIMARY KEY (structurelayoutid)
);
CREATE INDEX ix_a90ff72a ON public.ddmstructurelayout USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_b7158c0a ON public.ddmstructurelayout USING btree (structureversionid);
CREATE UNIQUE INDEX ix_c9a0402c ON public.ddmstructurelayout USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.ddmstructurelink

CREATE TABLE public.ddmstructurelink (
	structurelinkid int8 NOT NULL,
	companyid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	structureid int8 NULL,
	CONSTRAINT ddmstructurelink_pkey PRIMARY KEY (structurelinkid)
);
CREATE INDEX ix_17692b58 ON public.ddmstructurelink USING btree (structureid);
CREATE UNIQUE INDEX ix_e43143a3 ON public.ddmstructurelink USING btree (classnameid, classpk, structureid);

-- Drop table

-- DROP TABLE public.ddmstructureversion

CREATE TABLE public.ddmstructureversion (
	structureversionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	structureid int8 NULL,
	"version" varchar(75) NULL,
	parentstructureid int8 NULL,
	name text NULL,
	description text NULL,
	definition text NULL,
	storagetype varchar(75) NULL,
	type_ int4 NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT ddmstructureversion_pkey PRIMARY KEY (structureversionid)
);
CREATE INDEX ix_17b3c96c ON public.ddmstructureversion USING btree (structureid, status);
CREATE UNIQUE INDEX ix_64c3c42 ON public.ddmstructureversion USING btree (structureid, version);

-- Drop table

-- DROP TABLE public.ddmtemplate

CREATE TABLE public.ddmtemplate (
	uuid_ varchar(75) NULL,
	templateid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	versionuserid int8 NULL,
	versionusername varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	resourceclassnameid int8 NULL,
	templatekey varchar(75) NULL,
	"version" varchar(75) NULL,
	name text NULL,
	description text NULL,
	type_ varchar(75) NULL,
	mode_ varchar(75) NULL,
	"language" varchar(75) NULL,
	script text NULL,
	cacheable bool NULL,
	smallimage bool NULL,
	smallimageid int8 NULL,
	smallimageurl text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT ddmtemplate_pkey PRIMARY KEY (templateid)
);
CREATE INDEX ix_127a35b0 ON public.ddmtemplate USING btree (smallimageid);
CREATE UNIQUE INDEX ix_1aa75ce3 ON public.ddmtemplate USING btree (uuid_, groupid);
CREATE INDEX ix_32f83d16 ON public.ddmtemplate USING btree (classpk);
CREATE INDEX ix_33bef579 ON public.ddmtemplate USING btree (language);
CREATE INDEX ix_b1c33ea6 ON public.ddmtemplate USING btree (groupid, classpk);
CREATE INDEX ix_b6356f93 ON public.ddmtemplate USING btree (classnameid, classpk, type_);
CREATE INDEX ix_c4f283c8 ON public.ddmtemplate USING btree (type_);
CREATE INDEX ix_cae41a28 ON public.ddmtemplate USING btree (templatekey);
CREATE INDEX ix_d4c2c221 ON public.ddmtemplate USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_e6dfab84 ON public.ddmtemplate USING btree (groupid, classnameid, templatekey);
CREATE INDEX ix_f0c3449 ON public.ddmtemplate USING btree (groupid, classnameid, classpk, type_, mode_);

-- Drop table

-- DROP TABLE public.ddmtemplatelink

CREATE TABLE public.ddmtemplatelink (
	templatelinkid int8 NOT NULL,
	companyid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	templateid int8 NULL,
	CONSTRAINT ddmtemplatelink_pkey PRIMARY KEY (templatelinkid)
);
CREATE UNIQUE INDEX ix_6f3b3e9c ON public.ddmtemplatelink USING btree (classnameid, classpk);
CREATE INDEX ix_85278170 ON public.ddmtemplatelink USING btree (templateid);

-- Drop table

-- DROP TABLE public.ddmtemplateversion

CREATE TABLE public.ddmtemplateversion (
	templateversionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	templateid int8 NULL,
	"version" varchar(75) NULL,
	name text NULL,
	description text NULL,
	"language" varchar(75) NULL,
	script text NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT ddmtemplateversion_pkey PRIMARY KEY (templateversionid)
);
CREATE INDEX ix_66382fc6 ON public.ddmtemplateversion USING btree (templateid, status);
CREATE UNIQUE INDEX ix_8854a128 ON public.ddmtemplateversion USING btree (templateid, version);

-- Drop table

-- DROP TABLE public.dlcontent

CREATE TABLE public.dlcontent (
	contentid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	repositoryid int8 NULL,
	path_ varchar(255) NULL,
	"version" varchar(75) NULL,
	data_ oid NULL,
	size_ int8 NULL,
	CONSTRAINT dlcontent_pkey PRIMARY KEY (contentid)
);
CREATE UNIQUE INDEX ix_fdd1aaa8 ON public.dlcontent USING btree (companyid, repositoryid, path_, version);

-- Drop table

-- DROP TABLE public.dlfileentry

CREATE TABLE public.dlfileentry (
	uuid_ varchar(75) NULL,
	fileentryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	repositoryid int8 NULL,
	folderid int8 NULL,
	treepath text NULL,
	name varchar(255) NULL,
	filename varchar(255) NULL,
	"extension" varchar(75) NULL,
	mimetype varchar(75) NULL,
	title varchar(255) NULL,
	description text NULL,
	extrasettings text NULL,
	fileentrytypeid int8 NULL,
	"version" varchar(75) NULL,
	size_ int8 NULL,
	readcount int4 NULL,
	smallimageid int8 NULL,
	largeimageid int8 NULL,
	custom1imageid int8 NULL,
	custom2imageid int8 NULL,
	manualcheckinrequired bool NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT dlfileentry_pkey PRIMARY KEY (fileentryid)
);
CREATE INDEX ix_1b352f4a ON public.dlfileentry USING btree (repositoryid, folderid);
CREATE INDEX ix_25f5cab9 ON public.dlfileentry USING btree (smallimageid, largeimageid, custom1imageid, custom2imageid);
CREATE INDEX ix_29d0af28 ON public.dlfileentry USING btree (groupid, folderid, fileentrytypeid);
CREATE INDEX ix_31079de8 ON public.dlfileentry USING btree (uuid_, companyid);
CREATE INDEX ix_4db7a143 ON public.dlfileentry USING btree (largeimageid);
CREATE UNIQUE INDEX ix_5391712 ON public.dlfileentry USING btree (groupid, folderid, name);
CREATE INDEX ix_5444c427 ON public.dlfileentry USING btree (companyid, fileentrytypeid);
CREATE INDEX ix_772ecde7 ON public.dlfileentry USING btree (fileentrytypeid);
CREATE INDEX ix_8f6c75d0 ON public.dlfileentry USING btree (folderid, name);
CREATE INDEX ix_ac9bdedd ON public.dlfileentry USING btree (custom2imageid);
CREATE INDEX ix_b8526dbe ON public.dlfileentry USING btree (custom1imageid);
CREATE INDEX ix_baf654e5 ON public.dlfileentry USING btree (groupid, fileentrytypeid);
CREATE UNIQUE INDEX ix_bc2e7e6a ON public.dlfileentry USING btree (uuid_, groupid);
CREATE INDEX ix_d20c434d ON public.dlfileentry USING btree (groupid, userid, folderid);
CREATE INDEX ix_d9492cf6 ON public.dlfileentry USING btree (mimetype);
CREATE UNIQUE INDEX ix_df37d92e ON public.dlfileentry USING btree (groupid, folderid, filename);
CREATE UNIQUE INDEX ix_ed5ca615 ON public.dlfileentry USING btree (groupid, folderid, title);

-- Drop table

-- DROP TABLE public.dlfileentrymetadata

CREATE TABLE public.dlfileentrymetadata (
	uuid_ varchar(75) NULL,
	fileentrymetadataid int8 NOT NULL,
	companyid int8 NULL,
	ddmstorageid int8 NULL,
	ddmstructureid int8 NULL,
	fileentryid int8 NULL,
	fileversionid int8 NULL,
	CONSTRAINT dlfileentrymetadata_pkey PRIMARY KEY (fileentrymetadataid)
);
CREATE INDEX ix_1fe9c04 ON public.dlfileentrymetadata USING btree (fileversionid);
CREATE INDEX ix_4f40fe5e ON public.dlfileentrymetadata USING btree (fileentryid);
CREATE UNIQUE INDEX ix_7332b44f ON public.dlfileentrymetadata USING btree (ddmstructureid, fileversionid);
CREATE INDEX ix_e69431b7 ON public.dlfileentrymetadata USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.dlfileentrytype

CREATE TABLE public.dlfileentrytype (
	uuid_ varchar(75) NULL,
	fileentrytypeid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	fileentrytypekey varchar(75) NULL,
	name text NULL,
	description text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT dlfileentrytype_pkey PRIMARY KEY (fileentrytypeid)
);
CREATE UNIQUE INDEX ix_1399d844 ON public.dlfileentrytype USING btree (uuid_, groupid);
CREATE INDEX ix_5b03e942 ON public.dlfileentrytype USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_5b6bef5f ON public.dlfileentrytype USING btree (groupid, fileentrytypekey);

-- Drop table

-- DROP TABLE public.dlfileentrytypes_dlfolders

CREATE TABLE public.dlfileentrytypes_dlfolders (
	companyid int8 NOT NULL,
	fileentrytypeid int8 NOT NULL,
	folderid int8 NOT NULL,
	CONSTRAINT dlfileentrytypes_dlfolders_pkey PRIMARY KEY (fileentrytypeid, folderid)
);
CREATE INDEX ix_2e64d9f9 ON public.dlfileentrytypes_dlfolders USING btree (companyid);
CREATE INDEX ix_5bb6ad6c ON public.dlfileentrytypes_dlfolders USING btree (fileentrytypeid);
CREATE INDEX ix_6e00a2ec ON public.dlfileentrytypes_dlfolders USING btree (folderid);

-- Drop table

-- DROP TABLE public.dlfilerank

CREATE TABLE public.dlfilerank (
	filerankid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	createdate timestamp NULL,
	fileentryid int8 NULL,
	active_ bool NULL,
	CONSTRAINT dlfilerank_pkey PRIMARY KEY (filerankid)
);
CREATE INDEX ix_38f0315 ON public.dlfilerank USING btree (companyid, userid, fileentryid);
CREATE INDEX ix_4e96195b ON public.dlfilerank USING btree (groupid, userid, active_);
CREATE INDEX ix_a65a1f8b ON public.dlfilerank USING btree (fileentryid);
CREATE INDEX ix_eed06670 ON public.dlfilerank USING btree (userid);

-- Drop table

-- DROP TABLE public.dlfileshortcut

CREATE TABLE public.dlfileshortcut (
	uuid_ varchar(75) NULL,
	fileshortcutid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	repositoryid int8 NULL,
	folderid int8 NULL,
	tofileentryid int8 NULL,
	treepath text NULL,
	active_ bool NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT dlfileshortcut_pkey PRIMARY KEY (fileshortcutid)
);
CREATE INDEX ix_17ee3098 ON public.dlfileshortcut USING btree (groupid, folderid, active_, status);
CREATE INDEX ix_29ae81c4 ON public.dlfileshortcut USING btree (uuid_, companyid);
CREATE INDEX ix_4b7247f6 ON public.dlfileshortcut USING btree (tofileentryid);
CREATE INDEX ix_8571953e ON public.dlfileshortcut USING btree (companyid, status);
CREATE UNIQUE INDEX ix_fdb4a946 ON public.dlfileshortcut USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.dlfileversion

CREATE TABLE public.dlfileversion (
	uuid_ varchar(75) NULL,
	fileversionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	repositoryid int8 NULL,
	folderid int8 NULL,
	fileentryid int8 NULL,
	treepath text NULL,
	filename varchar(255) NULL,
	"extension" varchar(75) NULL,
	mimetype varchar(75) NULL,
	title varchar(255) NULL,
	description text NULL,
	changelog varchar(75) NULL,
	extrasettings text NULL,
	fileentrytypeid int8 NULL,
	"version" varchar(75) NULL,
	size_ int8 NULL,
	checksum varchar(75) NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT dlfileversion_pkey PRIMARY KEY (fileversionid)
);
CREATE INDEX ix_95e9e44e ON public.dlfileversion USING btree (uuid_, companyid);
CREATE INDEX ix_9be769ed ON public.dlfileversion USING btree (groupid, folderid, title, version);
CREATE INDEX ix_a0a283f4 ON public.dlfileversion USING btree (companyid, status);
CREATE UNIQUE INDEX ix_c99b2650 ON public.dlfileversion USING btree (uuid_, groupid);
CREATE INDEX ix_d47bb14d ON public.dlfileversion USING btree (fileentryid, status);
CREATE INDEX ix_dfd809d3 ON public.dlfileversion USING btree (groupid, folderid, status);
CREATE UNIQUE INDEX ix_e2815081 ON public.dlfileversion USING btree (fileentryid, version);
CREATE INDEX ix_ffb3395c ON public.dlfileversion USING btree (mimetype);

-- Drop table

-- DROP TABLE public.dlfolder

CREATE TABLE public.dlfolder (
	uuid_ varchar(75) NULL,
	folderid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	repositoryid int8 NULL,
	mountpoint bool NULL,
	parentfolderid int8 NULL,
	treepath text NULL,
	name varchar(255) NULL,
	description text NULL,
	lastpostdate timestamp NULL,
	defaultfileentrytypeid int8 NULL,
	hidden_ bool NULL,
	restrictiontype int4 NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT dlfolder_pkey PRIMARY KEY (folderid)
);
CREATE UNIQUE INDEX ix_3cc1ded2 ON public.dlfolder USING btree (uuid_, groupid);
CREATE INDEX ix_51556082 ON public.dlfolder USING btree (parentfolderid, name);
CREATE INDEX ix_6747b2bc ON public.dlfolder USING btree (repositoryid, parentfolderid);
CREATE INDEX ix_6f63f140 ON public.dlfolder USING btree (repositoryid, mountpoint);
CREATE UNIQUE INDEX ix_902fd874 ON public.dlfolder USING btree (groupid, parentfolderid, name);
CREATE INDEX ix_c88430ab ON public.dlfolder USING btree (groupid, mountpoint, parentfolderid, hidden_, status);
CREATE INDEX ix_ce360bf6 ON public.dlfolder USING btree (groupid, parentfolderid, hidden_, status);
CREATE INDEX ix_da448450 ON public.dlfolder USING btree (uuid_, companyid);
CREATE INDEX ix_e79be432 ON public.dlfolder USING btree (companyid, status);

-- Drop table

-- DROP TABLE public.dlsyncevent

CREATE TABLE public.dlsyncevent (
	synceventid int8 NOT NULL,
	companyid int8 NULL,
	modifiedtime int8 NULL,
	"event" varchar(75) NULL,
	type_ varchar(75) NULL,
	typepk int8 NULL,
	CONSTRAINT dlsyncevent_pkey PRIMARY KEY (synceventid)
);
CREATE INDEX ix_3d8e1607 ON public.dlsyncevent USING btree (modifiedtime);
CREATE UNIQUE INDEX ix_57d82b06 ON public.dlsyncevent USING btree (typepk);

-- Drop table

-- DROP TABLE public.emailaddress

CREATE TABLE public.emailaddress (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	emailaddressid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	address varchar(254) NULL,
	typeid int8 NULL,
	primary_ bool NULL,
	CONSTRAINT emailaddress_pkey PRIMARY KEY (emailaddressid)
);
CREATE INDEX ix_2a2cb130 ON public.emailaddress USING btree (companyid, classnameid, classpk, primary_);
CREATE INDEX ix_7b43cd8 ON public.emailaddress USING btree (userid);
CREATE INDEX ix_f74ab912 ON public.emailaddress USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.expandocolumn

CREATE TABLE public.expandocolumn (
	columnid int8 NOT NULL,
	companyid int8 NULL,
	tableid int8 NULL,
	name varchar(75) NULL,
	type_ int4 NULL,
	defaultdata text NULL,
	typesettings text NULL,
	CONSTRAINT expandocolumn_pkey PRIMARY KEY (columnid)
);
CREATE UNIQUE INDEX ix_fefc8da7 ON public.expandocolumn USING btree (tableid, name);

-- Drop table

-- DROP TABLE public.expandorow

CREATE TABLE public.expandorow (
	rowid_ int8 NOT NULL,
	companyid int8 NULL,
	modifieddate timestamp NULL,
	tableid int8 NULL,
	classpk int8 NULL,
	CONSTRAINT expandorow_pkey PRIMARY KEY (rowid_)
);
CREATE INDEX ix_49eb3118 ON public.expandorow USING btree (classpk);
CREATE UNIQUE INDEX ix_81efbff5 ON public.expandorow USING btree (tableid, classpk);

-- Drop table

-- DROP TABLE public.expandotable

CREATE TABLE public.expandotable (
	tableid int8 NOT NULL,
	companyid int8 NULL,
	classnameid int8 NULL,
	name varchar(75) NULL,
	CONSTRAINT expandotable_pkey PRIMARY KEY (tableid)
);
CREATE UNIQUE INDEX ix_37562284 ON public.expandotable USING btree (companyid, classnameid, name);

-- Drop table

-- DROP TABLE public.expandovalue

CREATE TABLE public.expandovalue (
	valueid int8 NOT NULL,
	companyid int8 NULL,
	tableid int8 NULL,
	columnid int8 NULL,
	rowid_ int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	data_ text NULL,
	CONSTRAINT expandovalue_pkey PRIMARY KEY (valueid)
);
CREATE INDEX ix_1bd3f4c ON public.expandovalue USING btree (tableid, classpk);
CREATE INDEX ix_9112a7a0 ON public.expandovalue USING btree (rowid_);
CREATE UNIQUE INDEX ix_9ddd21e5 ON public.expandovalue USING btree (columnid, rowid_);
CREATE INDEX ix_b29fef17 ON public.expandovalue USING btree (classnameid, classpk);
CREATE INDEX ix_b71e92d5 ON public.expandovalue USING btree (tableid, rowid_);
CREATE UNIQUE INDEX ix_d27b03e7 ON public.expandovalue USING btree (tableid, columnid, classpk);

-- Drop table

-- DROP TABLE public.exportimportconfiguration

CREATE TABLE public.exportimportconfiguration (
	mvccversion int8 NOT NULL DEFAULT 0,
	exportimportconfigurationid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name varchar(200) NULL,
	description text NULL,
	type_ int4 NULL,
	settings_ text NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT exportimportconfiguration_pkey PRIMARY KEY (exportimportconfigurationid)
);
CREATE INDEX ix_1827a2e5 ON public.exportimportconfiguration USING btree (companyid);
CREATE INDEX ix_38fa468d ON public.exportimportconfiguration USING btree (groupid, status);
CREATE INDEX ix_47cc6234 ON public.exportimportconfiguration USING btree (groupid, type_, status);

-- Drop table

-- DROP TABLE public.fragmentcollection

CREATE TABLE public.fragmentcollection (
	uuid_ varchar(75) NULL,
	fragmentcollectionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	fragmentcollectionkey varchar(75) NULL,
	name varchar(75) NULL,
	description text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT fragmentcollection_pkey PRIMARY KEY (fragmentcollectionid)
);
CREATE UNIQUE INDEX ix_19562e6b ON public.fragmentcollection USING btree (groupid, fragmentcollectionkey);
CREATE INDEX ix_536510f5 ON public.fragmentcollection USING btree (groupid, name);
CREATE INDEX ix_9a228268 ON public.fragmentcollection USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_dfb882ea ON public.fragmentcollection USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.fragmententry

CREATE TABLE public.fragmententry (
	uuid_ varchar(75) NULL,
	fragmententryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	fragmentcollectionid int8 NULL,
	fragmententrykey varchar(75) NULL,
	name varchar(75) NULL,
	css text NULL,
	html text NULL,
	js text NULL,
	previewfileentryid int8 NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT fragmententry_pkey PRIMARY KEY (fragmententryid)
);
CREATE UNIQUE INDEX ix_553e909e ON public.fragmententry USING btree (uuid_, groupid);
CREATE UNIQUE INDEX ix_62913c70 ON public.fragmententry USING btree (groupid, fragmentcollectionid, fragmententrykey);
CREATE UNIQUE INDEX ix_7f3f0eb3 ON public.fragmententry USING btree (groupid, fragmententrykey);
CREATE INDEX ix_9ec6fee4 ON public.fragmententry USING btree (groupid, fragmentcollectionid, name, status);
CREATE INDEX ix_bd18f965 ON public.fragmententry USING btree (groupid, fragmentcollectionid, status);
CREATE INDEX ix_c65bf31c ON public.fragmententry USING btree (uuid_, companyid);
CREATE INDEX ix_ddb6278b ON public.fragmententry USING btree (fragmentcollectionid, status);

-- Drop table

-- DROP TABLE public.fragmententrylink

CREATE TABLE public.fragmententrylink (
	uuid_ varchar(75) NULL,
	fragmententrylinkid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	originalfragmententrylinkid int8 NULL,
	fragmententryid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	css text NULL,
	html text NULL,
	js text NULL,
	editablevalues text NULL,
	"position" int4 NULL,
	lastpropagationdate timestamp NULL,
	namespace varchar(75) NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT fragmententrylink_pkey PRIMARY KEY (fragmententrylinkid)
);
CREATE INDEX ix_2fb5437d ON public.fragmententrylink USING btree (groupid, classnameid, classpk);
CREATE INDEX ix_4a9e751a ON public.fragmententrylink USING btree (groupid, fragmententryid, classnameid, classpk);
CREATE INDEX ix_9266c536 ON public.fragmententrylink USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_aa2b2138 ON public.fragmententrylink USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.friendlyurlentry

CREATE TABLE public.friendlyurlentry (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	defaultlanguageid varchar(75) NULL,
	friendlyurlentryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	CONSTRAINT friendlyurlentry_pkey PRIMARY KEY (friendlyurlentryid)
);
CREATE INDEX ix_20861768 ON public.friendlyurlentry USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_63fd57ea ON public.friendlyurlentry USING btree (uuid_, groupid);
CREATE INDEX ix_f3dc928b ON public.friendlyurlentry USING btree (groupid, classnameid, classpk);

-- Drop table

-- DROP TABLE public.friendlyurlentrylocalization

CREATE TABLE public.friendlyurlentrylocalization (
	mvccversion int8 NOT NULL DEFAULT 0,
	friendlyurlentrylocalizationid int8 NOT NULL,
	companyid int8 NULL,
	friendlyurlentryid int8 NULL,
	languageid varchar(75) NULL,
	urltitle varchar(255) NULL,
	groupid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	CONSTRAINT friendlyurlentrylocalization_pkey PRIMARY KEY (friendlyurlentrylocalizationid)
);
CREATE UNIQUE INDEX ix_68be94b1 ON public.friendlyurlentrylocalization USING btree (friendlyurlentryid, languageid);
CREATE UNIQUE INDEX ix_8ab5cae ON public.friendlyurlentrylocalization USING btree (groupid, classnameid, urltitle);

-- Drop table

-- DROP TABLE public.friendlyurlentrymapping

CREATE TABLE public.friendlyurlentrymapping (
	mvccversion int8 NOT NULL DEFAULT 0,
	friendlyurlentrymappingid int8 NOT NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	friendlyurlentryid int8 NULL,
	CONSTRAINT friendlyurlentrymapping_pkey PRIMARY KEY (friendlyurlentrymappingid)
);
CREATE UNIQUE INDEX ix_3b5e645b ON public.friendlyurlentrymapping USING btree (classnameid, classpk);

-- Drop table

-- DROP TABLE public.group_

CREATE TABLE public.group_ (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	groupid int8 NOT NULL,
	companyid int8 NULL,
	creatoruserid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	parentgroupid int8 NULL,
	livegroupid int8 NULL,
	treepath text NULL,
	groupkey varchar(150) NULL,
	name text NULL,
	description text NULL,
	type_ int4 NULL,
	typesettings text NULL,
	manualmembership bool NULL,
	membershiprestriction int4 NULL,
	friendlyurl varchar(255) NULL,
	site bool NULL,
	remotestaginggroupcount int4 NULL,
	inheritcontent bool NULL,
	active_ bool NULL,
	CONSTRAINT group__pkey PRIMARY KEY (groupid)
);
CREATE INDEX ix_16218a38 ON public.group_ USING btree (livegroupid);
CREATE INDEX ix_26cc761a ON public.group_ USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_5bddb872 ON public.group_ USING btree (companyid, friendlyurl);
CREATE INDEX ix_63a2aabd ON public.group_ USING btree (companyid, site);
CREATE UNIQUE INDEX ix_754fbb1c ON public.group_ USING btree (uuid_, groupid);
CREATE INDEX ix_7b590a7a ON public.group_ USING btree (type_, active_);
CREATE INDEX ix_8257e37b ON public.group_ USING btree (classnameid, classpk);
CREATE UNIQUE INDEX ix_a729e3a6 ON public.group_ USING btree (companyid, classnameid, livegroupid, groupkey);
CREATE UNIQUE INDEX ix_aacd15f0 ON public.group_ USING btree (companyid, livegroupid, groupkey);
CREATE INDEX ix_abe2d54 ON public.group_ USING btree (companyid, classnameid, parentgroupid);
CREATE UNIQUE INDEX ix_acd2b296 ON public.group_ USING btree (companyid, groupkey);
CREATE INDEX ix_bd3cb13a ON public.group_ USING btree (classnameid, groupid, companyid, parentgroupid);
CREATE UNIQUE INDEX ix_d0d5e397 ON public.group_ USING btree (companyid, classnameid, classpk);
CREATE INDEX ix_d4bff38b ON public.group_ USING btree (companyid, parentgroupid, site, inheritcontent);
CREATE INDEX ix_ddc91a87 ON public.group_ USING btree (companyid, active_);

-- Drop table

-- DROP TABLE public.groups_orgs

CREATE TABLE public.groups_orgs (
	companyid int8 NOT NULL,
	groupid int8 NOT NULL,
	organizationid int8 NOT NULL,
	CONSTRAINT groups_orgs_pkey PRIMARY KEY (groupid, organizationid)
);
CREATE INDEX ix_6bbb7682 ON public.groups_orgs USING btree (organizationid);
CREATE INDEX ix_75267dca ON public.groups_orgs USING btree (groupid);
CREATE INDEX ix_8bfd4548 ON public.groups_orgs USING btree (companyid);

-- Drop table

-- DROP TABLE public.groups_roles

CREATE TABLE public.groups_roles (
	companyid int8 NOT NULL,
	groupid int8 NOT NULL,
	roleid int8 NOT NULL,
	CONSTRAINT groups_roles_pkey PRIMARY KEY (groupid, roleid)
);
CREATE INDEX ix_3103ef3d ON public.groups_roles USING btree (roleid);
CREATE INDEX ix_557d8550 ON public.groups_roles USING btree (companyid);
CREATE INDEX ix_84471fd2 ON public.groups_roles USING btree (groupid);

-- Drop table

-- DROP TABLE public.groups_usergroups

CREATE TABLE public.groups_usergroups (
	companyid int8 NOT NULL,
	groupid int8 NOT NULL,
	usergroupid int8 NOT NULL,
	CONSTRAINT groups_usergroups_pkey PRIMARY KEY (groupid, usergroupid)
);
CREATE INDEX ix_31fb749a ON public.groups_usergroups USING btree (groupid);
CREATE INDEX ix_3b69160f ON public.groups_usergroups USING btree (usergroupid);
CREATE INDEX ix_676fc818 ON public.groups_usergroups USING btree (companyid);

-- Drop table

-- DROP TABLE public.htmlpreviewentry

CREATE TABLE public.htmlpreviewentry (
	htmlpreviewentryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	fileentryid int8 NULL,
	CONSTRAINT htmlpreviewentry_pkey PRIMARY KEY (htmlpreviewentryid)
);
CREATE INDEX ix_b4b598a4 ON public.htmlpreviewentry USING btree (groupid, classnameid, classpk);

-- Drop table

-- DROP TABLE public.im_memberrequest

CREATE TABLE public.im_memberrequest (
	memberrequestid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	key_ varchar(75) NULL,
	receiveruserid int8 NULL,
	invitedroleid int8 NULL,
	invitedteamid int8 NULL,
	status int4 NULL,
	CONSTRAINT im_memberrequest_pkey PRIMARY KEY (memberrequestid)
);
CREATE INDEX ix_4c831df9 ON public.im_memberrequest USING btree (groupid, receiveruserid, status);
CREATE INDEX ix_b312eb0f ON public.im_memberrequest USING btree (receiveruserid, status);
CREATE INDEX ix_b4bcd9b4 ON public.im_memberrequest USING btree (key_);

-- Drop table

-- DROP TABLE public.image

CREATE TABLE public.image (
	mvccversion int8 NOT NULL DEFAULT 0,
	imageid int8 NOT NULL,
	companyid int8 NULL,
	modifieddate timestamp NULL,
	type_ varchar(75) NULL,
	height int4 NULL,
	width int4 NULL,
	size_ int4 NULL,
	CONSTRAINT image_pkey PRIMARY KEY (imageid)
);
CREATE INDEX ix_6a925a4d ON public.image USING btree (size_);

-- Drop table

-- DROP TABLE public.journalarticle

CREATE TABLE public.journalarticle (
	uuid_ varchar(75) NULL,
	id_ int8 NOT NULL,
	resourceprimkey int8 NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	folderid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	treepath text NULL,
	articleid varchar(75) NULL,
	"version" float8 NULL,
	urltitle varchar(255) NULL,
	"content" text NULL,
	ddmstructurekey varchar(75) NULL,
	ddmtemplatekey varchar(75) NULL,
	defaultlanguageid varchar(75) NULL,
	layoutuuid varchar(75) NULL,
	displaydate timestamp NULL,
	expirationdate timestamp NULL,
	reviewdate timestamp NULL,
	indexable bool NULL,
	smallimage bool NULL,
	smallimageid int8 NULL,
	smallimageurl text NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT journalarticle_pkey PRIMARY KEY (id_)
);
CREATE INDEX ix_17806804 ON public.journalarticle USING btree (ddmstructurekey);
CREATE INDEX ix_301d024b ON public.journalarticle USING btree (groupid, status);
CREATE INDEX ix_31b74f51 ON public.journalarticle USING btree (groupid, ddmtemplatekey);
CREATE INDEX ix_323df109 ON public.journalarticle USING btree (companyid, status);
CREATE UNIQUE INDEX ix_3463d95b ON public.journalarticle USING btree (uuid_, groupid);
CREATE INDEX ix_353bd560 ON public.journalarticle USING btree (groupid, classnameid, ddmstructurekey);
CREATE INDEX ix_3c028c1e ON public.journalarticle USING btree (groupid, layoutuuid);
CREATE INDEX ix_3e2765fc ON public.journalarticle USING btree (resourceprimkey, status);
CREATE INDEX ix_3f1ea19e ON public.journalarticle USING btree (layoutuuid);
CREATE INDEX ix_43a0f80f ON public.journalarticle USING btree (groupid, userid, classnameid);
CREATE INDEX ix_451d63ec ON public.journalarticle USING btree (resourceprimkey, indexable, status);
CREATE INDEX ix_4d5cd982 ON public.journalarticle USING btree (groupid, articleid, status);
CREATE INDEX ix_6e801bf5 ON public.journalarticle USING btree (groupid, classnameid, ddmtemplatekey);
CREATE INDEX ix_71520099 ON public.journalarticle USING btree (uuid_, companyid);
CREATE INDEX ix_717d0fa0 ON public.journalarticle USING btree (classnameid, expirationdate, status);
CREATE INDEX ix_75cca4d1 ON public.journalarticle USING btree (ddmtemplatekey);
CREATE UNIQUE INDEX ix_85c52eec ON public.journalarticle USING btree (groupid, articleid, version);
CREATE INDEX ix_9ce6e0fa ON public.journalarticle USING btree (groupid, classnameid, classpk);
CREATE INDEX ix_a2534ac2 ON public.journalarticle USING btree (groupid, classnameid, layoutuuid);
CREATE INDEX ix_c761b675 ON public.journalarticle USING btree (classnameid, ddmtemplatekey);
CREATE INDEX ix_d2d249e8 ON public.journalarticle USING btree (groupid, urltitle, status);
CREATE INDEX ix_d8eb0d84 ON public.journalarticle USING btree (groupid, ddmstructurekey);
CREATE INDEX ix_e82f322b ON public.journalarticle USING btree (companyid, version, status);
CREATE INDEX ix_ea05e9e1 ON public.journalarticle USING btree (displaydate, status);
CREATE INDEX ix_ef9b7028 ON public.journalarticle USING btree (smallimageid);
CREATE INDEX ix_f35391e8 ON public.journalarticle USING btree (groupid, folderid, status);

-- Drop table

-- DROP TABLE public.journalarticlelocalization

CREATE TABLE public.journalarticlelocalization (
	articlelocalizationid int8 NOT NULL,
	companyid int8 NULL,
	articlepk int8 NULL,
	title varchar(400) NULL,
	description text NULL,
	languageid varchar(75) NULL,
	CONSTRAINT journalarticlelocalization_pkey PRIMARY KEY (articlelocalizationid)
);
CREATE UNIQUE INDEX ix_acf2560a ON public.journalarticlelocalization USING btree (articlepk, languageid);

-- Drop table

-- DROP TABLE public.journalarticleresource

CREATE TABLE public.journalarticleresource (
	uuid_ varchar(75) NULL,
	resourceprimkey int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	articleid varchar(75) NULL,
	CONSTRAINT journalarticleresource_pkey PRIMARY KEY (resourceprimkey)
);
CREATE UNIQUE INDEX ix_84ab0309 ON public.journalarticleresource USING btree (uuid_, groupid);
CREATE UNIQUE INDEX ix_88df994a ON public.journalarticleresource USING btree (groupid, articleid);
CREATE INDEX ix_cc7576c7 ON public.journalarticleresource USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.journalcontentsearch

CREATE TABLE public.journalcontentsearch (
	contentsearchid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	privatelayout bool NULL,
	layoutid int8 NULL,
	portletid varchar(200) NULL,
	articleid varchar(75) NULL,
	CONSTRAINT journalcontentsearch_pkey PRIMARY KEY (contentsearchid)
);
CREATE INDEX ix_6838e427 ON public.journalcontentsearch USING btree (groupid, articleid);
CREATE INDEX ix_7cc7d73e ON public.journalcontentsearch USING btree (groupid, privatelayout, articleid);
CREATE INDEX ix_8daf8a35 ON public.journalcontentsearch USING btree (portletid);
CREATE INDEX ix_9207cb31 ON public.journalcontentsearch USING btree (articleid);
CREATE UNIQUE INDEX ix_c3aa93b8 ON public.journalcontentsearch USING btree (groupid, privatelayout, layoutid, portletid, articleid);

-- Drop table

-- DROP TABLE public.journalfeed

CREATE TABLE public.journalfeed (
	uuid_ varchar(75) NULL,
	id_ int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	feedid varchar(75) NULL,
	name varchar(75) NULL,
	description text NULL,
	ddmstructurekey varchar(75) NULL,
	ddmtemplatekey varchar(75) NULL,
	ddmrenderertemplatekey varchar(75) NULL,
	delta int4 NULL,
	orderbycol varchar(75) NULL,
	orderbytype varchar(75) NULL,
	targetlayoutfriendlyurl varchar(255) NULL,
	targetportletid varchar(200) NULL,
	contentfield varchar(75) NULL,
	feedformat varchar(75) NULL,
	feedversion float8 NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT journalfeed_pkey PRIMARY KEY (id_)
);
CREATE UNIQUE INDEX ix_39031f51 ON public.journalfeed USING btree (uuid_, groupid);
CREATE UNIQUE INDEX ix_65576cbc ON public.journalfeed USING btree (groupid, feedid);
CREATE INDEX ix_cb37a10f ON public.journalfeed USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.journalfolder

CREATE TABLE public.journalfolder (
	uuid_ varchar(75) NULL,
	folderid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	parentfolderid int8 NULL,
	treepath text NULL,
	name varchar(100) NULL,
	description text NULL,
	restrictiontype int4 NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT journalfolder_pkey PRIMARY KEY (folderid)
);
CREATE INDEX ix_54f89e1f ON public.journalfolder USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_65026705 ON public.journalfolder USING btree (groupid, parentfolderid, name);
CREATE INDEX ix_c36b0443 ON public.journalfolder USING btree (companyid, status);
CREATE UNIQUE INDEX ix_e002061 ON public.journalfolder USING btree (uuid_, groupid);
CREATE INDEX ix_e988689e ON public.journalfolder USING btree (groupid, name);
CREATE INDEX ix_efd9cac ON public.journalfolder USING btree (groupid, parentfolderid, status);

-- Drop table

-- DROP TABLE public.kaleoaction

CREATE TABLE public.kaleoaction (
	kaleoactionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleoclassname varchar(200) NULL,
	kaleoclasspk int8 NULL,
	kaleodefinitionversionid int8 NULL,
	kaleonodename varchar(200) NULL,
	name varchar(200) NULL,
	description text NULL,
	executiontype varchar(20) NULL,
	script text NULL,
	scriptlanguage varchar(75) NULL,
	scriptrequiredcontexts text NULL,
	priority int4 NULL,
	CONSTRAINT kaleoaction_pkey PRIMARY KEY (kaleoactionid)
);
CREATE INDEX ix_4b2545e8 ON public.kaleoaction USING btree (kaleoclassname, kaleoclasspk, executiontype);
CREATE INDEX ix_50e9112c ON public.kaleoaction USING btree (companyid);
CREATE INDEX ix_f8808c50 ON public.kaleoaction USING btree (kaleodefinitionversionid);

-- Drop table

-- DROP TABLE public.kaleocondition

CREATE TABLE public.kaleocondition (
	kaleoconditionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleodefinitionversionid int8 NULL,
	kaleonodeid int8 NULL,
	script text NULL,
	scriptlanguage varchar(75) NULL,
	scriptrequiredcontexts text NULL,
	CONSTRAINT kaleocondition_pkey PRIMARY KEY (kaleoconditionid)
);
CREATE INDEX ix_353b7fb5 ON public.kaleocondition USING btree (kaleodefinitionversionid);
CREATE INDEX ix_86cbd4c ON public.kaleocondition USING btree (kaleonodeid);
CREATE INDEX ix_fee46067 ON public.kaleocondition USING btree (companyid);

-- Drop table

-- DROP TABLE public.kaleodefinition

CREATE TABLE public.kaleodefinition (
	kaleodefinitionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name varchar(200) NULL,
	title text NULL,
	description text NULL,
	"content" text NULL,
	"version" int4 NULL,
	active_ bool NULL,
	CONSTRAINT kaleodefinition_pkey PRIMARY KEY (kaleodefinitionid)
);
CREATE INDEX ix_408542ba ON public.kaleodefinition USING btree (companyid, active_);
CREATE INDEX ix_4c23f11b ON public.kaleodefinition USING btree (companyid, name, active_);
CREATE INDEX ix_ec14f81a ON public.kaleodefinition USING btree (companyid, name, version);

-- Drop table

-- DROP TABLE public.kaleodefinitionversion

CREATE TABLE public.kaleodefinitionversion (
	kaleodefinitionversionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name varchar(200) NULL,
	title text NULL,
	description text NULL,
	"content" text NULL,
	"version" varchar(75) NULL,
	startkaleonodeid int8 NULL,
	status int4 NULL,
	CONSTRAINT kaleodefinitionversion_pkey PRIMARY KEY (kaleodefinitionversionid)
);
CREATE UNIQUE INDEX ix_ae02dcc ON public.kaleodefinitionversion USING btree (companyid, name, version);

-- Drop table

-- DROP TABLE public.kaleoinstance

CREATE TABLE public.kaleoinstance (
	kaleoinstanceid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleodefinitionversionid int8 NULL,
	kaleodefinitionname varchar(200) NULL,
	kaleodefinitionversion int4 NULL,
	rootkaleoinstancetokenid int8 NULL,
	classname varchar(200) NULL,
	classpk int8 NULL,
	completed bool NULL,
	completiondate timestamp NULL,
	workflowcontext text NULL,
	CONSTRAINT kaleoinstance_pkey PRIMARY KEY (kaleoinstanceid)
);
CREATE INDEX ix_3da1a5ac ON public.kaleoinstance USING btree (kaleodefinitionversionid, completed);
CREATE INDEX ix_58d85ecb ON public.kaleoinstance USING btree (classname, classpk);
CREATE INDEX ix_bf5839f8 ON public.kaleoinstance USING btree (companyid, kaleodefinitionname, kaleodefinitionversion, completiondate);
CREATE INDEX ix_c6d7a867 ON public.kaleoinstance USING btree (companyid, userid);

-- Drop table

-- DROP TABLE public.kaleoinstancetoken

CREATE TABLE public.kaleoinstancetoken (
	kaleoinstancetokenid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleodefinitionversionid int8 NULL,
	kaleoinstanceid int8 NULL,
	parentkaleoinstancetokenid int8 NULL,
	currentkaleonodeid int8 NULL,
	currentkaleonodename varchar(200) NULL,
	classname varchar(200) NULL,
	classpk int8 NULL,
	completed bool NULL,
	completiondate timestamp NULL,
	CONSTRAINT kaleoinstancetoken_pkey PRIMARY KEY (kaleoinstancetokenid)
);
CREATE INDEX ix_1181057e ON public.kaleoinstancetoken USING btree (kaleodefinitionversionid);
CREATE INDEX ix_360d34d9 ON public.kaleoinstancetoken USING btree (companyid, parentkaleoinstancetokenid, completiondate);
CREATE INDEX ix_f42aaff6 ON public.kaleoinstancetoken USING btree (kaleoinstanceid);

-- Drop table

-- DROP TABLE public.kaleolog

CREATE TABLE public.kaleolog (
	kaleologid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleoclassname varchar(200) NULL,
	kaleoclasspk int8 NULL,
	kaleodefinitionversionid int8 NULL,
	kaleoinstanceid int8 NULL,
	kaleoinstancetokenid int8 NULL,
	kaleotaskinstancetokenid int8 NULL,
	kaleonodename varchar(200) NULL,
	terminalkaleonode bool NULL,
	kaleoactionid int8 NULL,
	kaleoactionname varchar(200) NULL,
	kaleoactiondescription text NULL,
	previouskaleonodeid int8 NULL,
	previouskaleonodename varchar(200) NULL,
	previousassigneeclassname varchar(200) NULL,
	previousassigneeclasspk int8 NULL,
	currentassigneeclassname varchar(200) NULL,
	currentassigneeclasspk int8 NULL,
	type_ varchar(50) NULL,
	comment_ text NULL,
	startdate timestamp NULL,
	enddate timestamp NULL,
	duration int8 NULL,
	workflowcontext text NULL,
	CONSTRAINT kaleolog_pkey PRIMARY KEY (kaleologid)
);
CREATE INDEX ix_470b9ff8 ON public.kaleolog USING btree (kaleoinstancetokenid, type_);
CREATE INDEX ix_5bc6ab16 ON public.kaleolog USING btree (kaleoinstanceid);
CREATE INDEX ix_73b5f4de ON public.kaleolog USING btree (companyid);
CREATE INDEX ix_935d8e5e ON public.kaleolog USING btree (kaleodefinitionversionid);
CREATE INDEX ix_b0cdca38 ON public.kaleolog USING btree (kaleotaskinstancetokenid);
CREATE INDEX ix_e66a153a ON public.kaleolog USING btree (kaleoclassname, kaleoclasspk, kaleoinstancetokenid, type_);

-- Drop table

-- DROP TABLE public.kaleonode

CREATE TABLE public.kaleonode (
	kaleonodeid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleodefinitionversionid int8 NULL,
	name varchar(200) NULL,
	metadata text NULL,
	description text NULL,
	type_ varchar(20) NULL,
	initial_ bool NULL,
	terminal bool NULL,
	CONSTRAINT kaleonode_pkey PRIMARY KEY (kaleonodeid)
);
CREATE INDEX ix_4b1d16b4 ON public.kaleonode USING btree (companyid, kaleodefinitionversionid);
CREATE INDEX ix_f066921c ON public.kaleonode USING btree (kaleodefinitionversionid);

-- Drop table

-- DROP TABLE public.kaleonotification

CREATE TABLE public.kaleonotification (
	kaleonotificationid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleoclassname varchar(200) NULL,
	kaleoclasspk int8 NULL,
	kaleodefinitionversionid int8 NULL,
	kaleonodename varchar(200) NULL,
	name varchar(200) NULL,
	description text NULL,
	executiontype varchar(20) NULL,
	"template" text NULL,
	templatelanguage varchar(75) NULL,
	notificationtypes varchar(25) NULL,
	CONSTRAINT kaleonotification_pkey PRIMARY KEY (kaleonotificationid)
);
CREATE INDEX ix_38829497 ON public.kaleonotification USING btree (companyid);
CREATE INDEX ix_b8486585 ON public.kaleonotification USING btree (kaleodefinitionversionid);
CREATE INDEX ix_f3362e93 ON public.kaleonotification USING btree (kaleoclassname, kaleoclasspk, executiontype);

-- Drop table

-- DROP TABLE public.kaleonotificationrecipient

CREATE TABLE public.kaleonotificationrecipient (
	kaleonotificationrecipientid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleodefinitionversionid int8 NULL,
	kaleonotificationid int8 NULL,
	recipientclassname varchar(200) NULL,
	recipientclasspk int8 NULL,
	recipientroletype int4 NULL,
	recipientscript text NULL,
	recipientscriptlanguage varchar(75) NULL,
	recipientscriptcontexts text NULL,
	address varchar(255) NULL,
	notificationreceptiontype varchar(3) NULL,
	CONSTRAINT kaleonotificationrecipient_pkey PRIMARY KEY (kaleonotificationrecipientid)
);
CREATE INDEX ix_2c8c4af4 ON public.kaleonotificationrecipient USING btree (companyid);
CREATE INDEX ix_7f4fed02 ON public.kaleonotificationrecipient USING btree (kaleonotificationid);
CREATE INDEX ix_b6d98988 ON public.kaleonotificationrecipient USING btree (kaleodefinitionversionid);

-- Drop table

-- DROP TABLE public.kaleoprocess

CREATE TABLE public.kaleoprocess (
	uuid_ varchar(75) NULL,
	kaleoprocessid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	ddlrecordsetid int8 NULL,
	ddmtemplateid int8 NULL,
	workflowdefinitionname varchar(75) NULL,
	workflowdefinitionversion int4 NULL,
	CONSTRAINT kaleoprocess_pkey PRIMARY KEY (kaleoprocessid)
);
CREATE INDEX ix_65ca6cc9 ON public.kaleoprocess USING btree (ddlrecordsetid);
CREATE INDEX ix_a29a06d5 ON public.kaleoprocess USING btree (groupid);
CREATE INDEX ix_c1c03029 ON public.kaleoprocess USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_c6b8aceb ON public.kaleoprocess USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.kaleoprocesslink

CREATE TABLE public.kaleoprocesslink (
	kaleoprocesslinkid int8 NOT NULL,
	kaleoprocessid int8 NULL,
	workflowtaskname varchar(75) NULL,
	ddmtemplateid int8 NULL,
	CONSTRAINT kaleoprocesslink_pkey PRIMARY KEY (kaleoprocesslinkid)
);
CREATE UNIQUE INDEX ix_10e0e9d0 ON public.kaleoprocesslink USING btree (kaleoprocessid, workflowtaskname);

-- Drop table

-- DROP TABLE public.kaleotask

CREATE TABLE public.kaleotask (
	kaleotaskid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleodefinitionversionid int8 NULL,
	kaleonodeid int8 NULL,
	name varchar(200) NULL,
	description text NULL,
	CONSTRAINT kaleotask_pkey PRIMARY KEY (kaleotaskid)
);
CREATE INDEX ix_77b3f1a2 ON public.kaleotask USING btree (kaleonodeid);
CREATE INDEX ix_e1f8b23d ON public.kaleotask USING btree (companyid);
CREATE INDEX ix_feca871f ON public.kaleotask USING btree (kaleodefinitionversionid);

-- Drop table

-- DROP TABLE public.kaleotaskassignment

CREATE TABLE public.kaleotaskassignment (
	kaleotaskassignmentid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleoclassname varchar(200) NULL,
	kaleoclasspk int8 NULL,
	kaleodefinitionversionid int8 NULL,
	kaleonodeid int8 NULL,
	assigneeclassname varchar(200) NULL,
	assigneeclasspk int8 NULL,
	assigneeactionid varchar(75) NULL,
	assigneescript text NULL,
	assigneescriptlanguage varchar(75) NULL,
	assigneescriptrequiredcontexts text NULL,
	CONSTRAINT kaleotaskassignment_pkey PRIMARY KEY (kaleotaskassignmentid)
);
CREATE INDEX ix_1087068e ON public.kaleotaskassignment USING btree (kaleoclassname, kaleoclasspk, assigneeclassname);
CREATE INDEX ix_611732b0 ON public.kaleotaskassignment USING btree (companyid);
CREATE INDEX ix_e362b24c ON public.kaleotaskassignment USING btree (kaleodefinitionversionid);

-- Drop table

-- DROP TABLE public.kaleotaskassignmentinstance

CREATE TABLE public.kaleotaskassignmentinstance (
	kaleotaskassignmentinstanceid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleodefinitionversionid int8 NULL,
	kaleoinstanceid int8 NULL,
	kaleoinstancetokenid int8 NULL,
	kaleotaskinstancetokenid int8 NULL,
	kaleotaskid int8 NULL,
	kaleotaskname varchar(200) NULL,
	assigneeclassname varchar(200) NULL,
	assigneeclasspk int8 NULL,
	completed bool NULL,
	completiondate timestamp NULL,
	CONSTRAINT kaleotaskassignmentinstance_pkey PRIMARY KEY (kaleotaskassignmentinstanceid)
);
CREATE INDEX ix_38a47b17 ON public.kaleotaskassignmentinstance USING btree (groupid, assigneeclasspk);
CREATE INDEX ix_3bd436fd ON public.kaleotaskassignmentinstance USING btree (assigneeclassname, assigneeclasspk);
CREATE INDEX ix_67a9ee93 ON public.kaleotaskassignmentinstance USING btree (kaleoinstanceid);
CREATE INDEX ix_6e3cda1b ON public.kaleotaskassignmentinstance USING btree (companyid);
CREATE INDEX ix_b751e781 ON public.kaleotaskassignmentinstance USING btree (kaleodefinitionversionid);
CREATE INDEX ix_d4c2235b ON public.kaleotaskassignmentinstance USING btree (kaleotaskinstancetokenid);

-- Drop table

-- DROP TABLE public.kaleotaskform

CREATE TABLE public.kaleotaskform (
	kaleotaskformid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleodefinitionversionid int8 NULL,
	kaleonodeid int8 NULL,
	kaleotaskid int8 NULL,
	kaleotaskname varchar(200) NULL,
	name varchar(200) NULL,
	description text NULL,
	formcompanyid int8 NULL,
	formdefinition text NULL,
	formgroupid int8 NULL,
	formid int8 NULL,
	formuuid varchar(75) NULL,
	metadata text NULL,
	priority int4 NULL,
	CONSTRAINT kaleotaskform_pkey PRIMARY KEY (kaleotaskformid)
);
CREATE INDEX ix_3b8b7f83 ON public.kaleotaskform USING btree (kaleodefinitionversionid);
CREATE INDEX ix_945326be ON public.kaleotaskform USING btree (kaleonodeid);
CREATE INDEX ix_e38a5954 ON public.kaleotaskform USING btree (kaleotaskid, formuuid);
CREATE INDEX ix_efda7e59 ON public.kaleotaskform USING btree (companyid);

-- Drop table

-- DROP TABLE public.kaleotaskforminstance

CREATE TABLE public.kaleotaskforminstance (
	kaleotaskforminstanceid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleodefinitionversionid int8 NULL,
	kaleoinstanceid int8 NULL,
	kaleotaskid int8 NULL,
	kaleotaskinstancetokenid int8 NULL,
	kaleotaskformid int8 NULL,
	formvalues text NULL,
	formvalueentrygroupid int8 NULL,
	formvalueentryid int8 NULL,
	formvalueentryuuid varchar(75) NULL,
	metadata text NULL,
	CONSTRAINT kaleotaskforminstance_pkey PRIMARY KEY (kaleotaskforminstanceid)
);
CREATE INDEX ix_2a86346c ON public.kaleotaskforminstance USING btree (kaleotaskid);
CREATE INDEX ix_2c81c992 ON public.kaleotaskforminstance USING btree (kaleotaskinstancetokenid);
CREATE INDEX ix_77b26cc4 ON public.kaleotaskforminstance USING btree (companyid);
CREATE INDEX ix_e7f42bd0 ON public.kaleotaskforminstance USING btree (kaleotaskformid);
CREATE INDEX ix_f118db8 ON public.kaleotaskforminstance USING btree (kaleodefinitionversionid);
CREATE INDEX ix_ff271e7c ON public.kaleotaskforminstance USING btree (kaleoinstanceid);

-- Drop table

-- DROP TABLE public.kaleotaskinstancetoken

CREATE TABLE public.kaleotaskinstancetoken (
	kaleotaskinstancetokenid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleodefinitionversionid int8 NULL,
	kaleoinstanceid int8 NULL,
	kaleoinstancetokenid int8 NULL,
	kaleotaskid int8 NULL,
	kaleotaskname varchar(200) NULL,
	classname varchar(200) NULL,
	classpk int8 NULL,
	completionuserid int8 NULL,
	completed bool NULL,
	completiondate timestamp NULL,
	duedate timestamp NULL,
	workflowcontext text NULL,
	CONSTRAINT kaleotaskinstancetoken_pkey PRIMARY KEY (kaleotaskinstancetokenid)
);
CREATE INDEX ix_997fe723 ON public.kaleotaskinstancetoken USING btree (companyid);
CREATE INDEX ix_a3271995 ON public.kaleotaskinstancetoken USING btree (classname, classpk);
CREATE INDEX ix_b2822979 ON public.kaleotaskinstancetoken USING btree (kaleodefinitionversionid);
CREATE INDEX ix_b857a115 ON public.kaleotaskinstancetoken USING btree (kaleoinstanceid, kaleotaskid);

-- Drop table

-- DROP TABLE public.kaleotimer

CREATE TABLE public.kaleotimer (
	kaleotimerid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleoclassname varchar(200) NULL,
	kaleoclasspk int8 NULL,
	kaleodefinitionversionid int8 NULL,
	name varchar(75) NULL,
	blocking bool NULL,
	description text NULL,
	duration float8 NULL,
	"scale" varchar(75) NULL,
	recurrenceduration float8 NULL,
	recurrencescale varchar(75) NULL,
	CONSTRAINT kaleotimer_pkey PRIMARY KEY (kaleotimerid)
);
CREATE INDEX ix_1a479f32 ON public.kaleotimer USING btree (kaleoclassname, kaleoclasspk, blocking);

-- Drop table

-- DROP TABLE public.kaleotimerinstancetoken

CREATE TABLE public.kaleotimerinstancetoken (
	kaleotimerinstancetokenid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleoclassname varchar(200) NULL,
	kaleoclasspk int8 NULL,
	kaleodefinitionversionid int8 NULL,
	kaleoinstanceid int8 NULL,
	kaleoinstancetokenid int8 NULL,
	kaleotaskinstancetokenid int8 NULL,
	kaleotimerid int8 NULL,
	kaleotimername varchar(200) NULL,
	blocking bool NULL,
	completionuserid int8 NULL,
	completed bool NULL,
	completiondate timestamp NULL,
	workflowcontext text NULL,
	CONSTRAINT kaleotimerinstancetoken_pkey PRIMARY KEY (kaleotimerinstancetokenid)
);
CREATE INDEX ix_13a5ba2c ON public.kaleotimerinstancetoken USING btree (kaleoinstancetokenid, kaleotimerid);
CREATE INDEX ix_db279423 ON public.kaleotimerinstancetoken USING btree (kaleoinstancetokenid, completed);
CREATE INDEX ix_db96c55b ON public.kaleotimerinstancetoken USING btree (kaleoinstanceid);
CREATE INDEX ix_f904a89a ON public.kaleotimerinstancetoken USING btree (kaleoinstancetokenid, blocking, completed);

-- Drop table

-- DROP TABLE public.kaleotransition

CREATE TABLE public.kaleotransition (
	kaleotransitionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(200) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	kaleodefinitionversionid int8 NULL,
	kaleonodeid int8 NULL,
	name varchar(200) NULL,
	description text NULL,
	sourcekaleonodeid int8 NULL,
	sourcekaleonodename varchar(200) NULL,
	targetkaleonodeid int8 NULL,
	targetkaleonodename varchar(200) NULL,
	defaulttransition bool NULL,
	CONSTRAINT kaleotransition_pkey PRIMARY KEY (kaleotransitionid)
);
CREATE INDEX ix_16b426ef ON public.kaleotransition USING btree (kaleodefinitionversionid);
CREATE INDEX ix_41d6c6d ON public.kaleotransition USING btree (companyid);
CREATE INDEX ix_85268a11 ON public.kaleotransition USING btree (kaleonodeid, name);
CREATE INDEX ix_a38e2194 ON public.kaleotransition USING btree (kaleonodeid, defaulttransition);

-- Drop table

-- DROP TABLE public.kbarticle

CREATE TABLE public.kbarticle (
	uuid_ varchar(75) NULL,
	kbarticleid int8 NOT NULL,
	resourceprimkey int8 NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	rootresourceprimkey int8 NULL,
	parentresourceclassnameid int8 NULL,
	parentresourceprimkey int8 NULL,
	kbfolderid int8 NULL,
	"version" int4 NULL,
	title text NULL,
	urltitle varchar(75) NULL,
	"content" text NULL,
	description text NULL,
	priority float8 NULL,
	sections text NULL,
	viewcount int4 NULL,
	latest bool NULL,
	main bool NULL,
	sourceurl text NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT kbarticle_pkey PRIMARY KEY (kbarticleid)
);
CREATE INDEX ix_1dcc5f79 ON public.kbarticle USING btree (parentresourceprimkey, main);
CREATE INDEX ix_2b11f674 ON public.kbarticle USING btree (groupid, kbfolderid, latest);
CREATE INDEX ix_2b6103f2 ON public.kbarticle USING btree (parentresourceprimkey, status);
CREATE INDEX ix_379fd6bc ON public.kbarticle USING btree (groupid, kbfolderid, urltitle, status);
CREATE INDEX ix_49630fa ON public.kbarticle USING btree (resourceprimkey, groupid, status);
CREATE INDEX ix_4e87d659 ON public.kbarticle USING btree (uuid_, companyid);
CREATE INDEX ix_4e89983c ON public.kbarticle USING btree (resourceprimkey, status);
CREATE INDEX ix_55a38cf2 ON public.kbarticle USING btree (groupid, parentresourceprimkey, status);
CREATE INDEX ix_571c019e ON public.kbarticle USING btree (companyid, latest);
CREATE INDEX ix_5a381890 ON public.kbarticle USING btree (companyid, main);
CREATE UNIQUE INDEX ix_5c941f1b ON public.kbarticle USING btree (uuid_, groupid);
CREATE INDEX ix_5fef5f4f ON public.kbarticle USING btree (resourceprimkey, groupid, latest);
CREATE INDEX ix_694ea2e0 ON public.kbarticle USING btree (groupid, latest);
CREATE INDEX ix_69c17e43 ON public.kbarticle USING btree (resourceprimkey, main);
CREATE INDEX ix_86ba3247 ON public.kbarticle USING btree (parentresourceprimkey, latest);
CREATE INDEX ix_8ef92e81 ON public.kbarticle USING btree (resourceprimkey, groupid, main);
CREATE INDEX ix_97c62252 ON public.kbarticle USING btree (groupid, main);
CREATE INDEX ix_a9e2c691 ON public.kbarticle USING btree (resourceprimkey, latest);
CREATE UNIQUE INDEX ix_aa304772 ON public.kbarticle USING btree (resourceprimkey, version);
CREATE INDEX ix_b0fcbb47 ON public.kbarticle USING btree (groupid, parentresourceprimkey, latest);
CREATE UNIQUE INDEX ix_b5b6c674 ON public.kbarticle USING btree (resourceprimkey, groupid, version);
CREATE INDEX ix_cfb8c81f ON public.kbarticle USING btree (groupid, kbfolderid, status);
CREATE INDEX ix_d91d2879 ON public.kbarticle USING btree (groupid, parentresourceprimkey, main);
CREATE INDEX ix_df5748b ON public.kbarticle USING btree (groupid, status);
CREATE INDEX ix_fbc2d349 ON public.kbarticle USING btree (companyid, status);

-- Drop table

-- DROP TABLE public.kbcomment

CREATE TABLE public.kbcomment (
	uuid_ varchar(75) NULL,
	kbcommentid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	"content" text NULL,
	userrating int4 NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	CONSTRAINT kbcomment_pkey PRIMARY KEY (kbcommentid)
);
CREATE INDEX ix_47d3ae89 ON public.kbcomment USING btree (classnameid, classpk, status);
CREATE INDEX ix_6cb72942 ON public.kbcomment USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_791d1844 ON public.kbcomment USING btree (uuid_, groupid);
CREATE INDEX ix_828ba082 ON public.kbcomment USING btree (groupid, status);
CREATE INDEX ix_e8d43932 ON public.kbcomment USING btree (groupid, classnameid);
CREATE INDEX ix_fd56a55d ON public.kbcomment USING btree (userid, classnameid, classpk);

-- Drop table

-- DROP TABLE public.kbfolder

CREATE TABLE public.kbfolder (
	uuid_ varchar(75) NULL,
	kbfolderid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	parentkbfolderid int8 NULL,
	name varchar(75) NULL,
	urltitle varchar(75) NULL,
	description text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT kbfolder_pkey PRIMARY KEY (kbfolderid)
);
CREATE UNIQUE INDEX ix_1fd022a1 ON public.kbfolder USING btree (uuid_, groupid);
CREATE INDEX ix_32d1105f ON public.kbfolder USING btree (uuid_, companyid);
CREATE INDEX ix_3fa4415c ON public.kbfolder USING btree (groupid, parentkbfolderid, name);
CREATE INDEX ix_729a89fa ON public.kbfolder USING btree (groupid, parentkbfolderid, urltitle);

-- Drop table

-- DROP TABLE public.kbtemplate

CREATE TABLE public.kbtemplate (
	uuid_ varchar(75) NULL,
	kbtemplateid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	title text NULL,
	"content" text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT kbtemplate_pkey PRIMARY KEY (kbtemplateid)
);
CREATE UNIQUE INDEX ix_40aa25ed ON public.kbtemplate USING btree (uuid_, groupid);
CREATE INDEX ix_83d9cc13 ON public.kbtemplate USING btree (groupid);
CREATE INDEX ix_853770ab ON public.kbtemplate USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.layout

CREATE TABLE public.layout (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	plid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	privatelayout bool NULL,
	layoutid int8 NULL,
	parentlayoutid int8 NULL,
	name text NULL,
	title text NULL,
	description text NULL,
	keywords text NULL,
	robots text NULL,
	type_ varchar(75) NULL,
	typesettings text NULL,
	hidden_ bool NULL,
	friendlyurl varchar(255) NULL,
	iconimageid int8 NULL,
	themeid varchar(75) NULL,
	colorschemeid varchar(75) NULL,
	css text NULL,
	priority int4 NULL,
	layoutprototypeuuid varchar(75) NULL,
	layoutprototypelinkenabled bool NULL,
	sourceprototypelayoutuuid varchar(75) NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT layout_pkey PRIMARY KEY (plid)
);
CREATE INDEX ix_1a1b61d2 ON public.layout USING btree (groupid, privatelayout, type_);
CREATE INDEX ix_23922f7d ON public.layout USING btree (iconimageid);
CREATE INDEX ix_2ce4be84 ON public.layout USING btree (uuid_, companyid);
CREATE INDEX ix_39a18ecc ON public.layout USING btree (sourceprototypelayoutuuid);
CREATE INDEX ix_3bc009c0 ON public.layout USING btree (privatelayout, iconimageid);
CREATE INDEX ix_6edc627b ON public.layout USING btree (groupid, type_);
CREATE UNIQUE INDEX ix_7162c27c ON public.layout USING btree (groupid, privatelayout, layoutid);
CREATE INDEX ix_7399b71e ON public.layout USING btree (groupid, privatelayout, parentlayoutid, priority);
CREATE INDEX ix_881eabcb ON public.layout USING btree (companyid, layoutprototypeuuid);
CREATE INDEX ix_8ce8c0d9 ON public.layout USING btree (groupid, privatelayout, sourceprototypelayoutuuid);
CREATE INDEX ix_b529bfd3 ON public.layout USING btree (layoutprototypeuuid);
CREATE UNIQUE INDEX ix_bc2c4231 ON public.layout USING btree (groupid, privatelayout, friendlyurl);
CREATE UNIQUE INDEX ix_e118c537 ON public.layout USING btree (uuid_, groupid, privatelayout);

-- Drop table

-- DROP TABLE public.layoutbranch

CREATE TABLE public.layoutbranch (
	mvccversion int8 NOT NULL DEFAULT 0,
	layoutbranchid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	layoutsetbranchid int8 NULL,
	plid int8 NULL,
	name varchar(75) NULL,
	description text NULL,
	master bool NULL,
	CONSTRAINT layoutbranch_pkey PRIMARY KEY (layoutbranchid)
);
CREATE INDEX ix_a705ff94 ON public.layoutbranch USING btree (layoutsetbranchid, plid, master);
CREATE UNIQUE INDEX ix_fd57097d ON public.layoutbranch USING btree (layoutsetbranchid, plid, name);

-- Drop table

-- DROP TABLE public.layoutfriendlyurl

CREATE TABLE public.layoutfriendlyurl (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	layoutfriendlyurlid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	plid int8 NULL,
	privatelayout bool NULL,
	friendlyurl varchar(255) NULL,
	languageid varchar(75) NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT layoutfriendlyurl_pkey PRIMARY KEY (layoutfriendlyurlid)
);
CREATE UNIQUE INDEX ix_326525d6 ON public.layoutfriendlyurl USING btree (uuid_, groupid);
CREATE INDEX ix_59051329 ON public.layoutfriendlyurl USING btree (plid, friendlyurl);
CREATE UNIQUE INDEX ix_a6fc2b28 ON public.layoutfriendlyurl USING btree (groupid, privatelayout, friendlyurl, languageid);
CREATE UNIQUE INDEX ix_c5762e72 ON public.layoutfriendlyurl USING btree (plid, languageid);
CREATE INDEX ix_eab317c8 ON public.layoutfriendlyurl USING btree (companyid);
CREATE INDEX ix_f4321a54 ON public.layoutfriendlyurl USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.layoutpagetemplatecollection

CREATE TABLE public.layoutpagetemplatecollection (
	uuid_ varchar(75) NULL,
	layoutpagetemplatecollectionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name varchar(75) NULL,
	description text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT layoutpagetemplatecollection_pkey PRIMARY KEY (layoutpagetemplatecollectionid)
);
CREATE UNIQUE INDEX ix_9e4eaa8d ON public.layoutpagetemplatecollection USING btree (uuid_, groupid);
CREATE INDEX ix_bcd4d4b ON public.layoutpagetemplatecollection USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_d569e8f2 ON public.layoutpagetemplatecollection USING btree (groupid, name);

-- Drop table

-- DROP TABLE public.layoutpagetemplateentry

CREATE TABLE public.layoutpagetemplateentry (
	uuid_ varchar(75) NULL,
	layoutpagetemplateentryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	layoutpagetemplatecollectionid int8 NULL,
	classnameid int8 NULL,
	classtypeid int8 NULL,
	name varchar(75) NULL,
	type_ int4 NULL,
	previewfileentryid int8 NULL,
	defaulttemplate bool NULL,
	layoutprototypeid int8 NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT layoutpagetemplateentry_pkey PRIMARY KEY (layoutpagetemplateentryid)
);
CREATE INDEX ix_1736f4a2 ON public.layoutpagetemplateentry USING btree (groupid, classnameid, defaulttemplate);
CREATE INDEX ix_1f1bea76 ON public.layoutpagetemplateentry USING btree (groupid, type_, status);
CREATE INDEX ix_227636e7 ON public.layoutpagetemplateentry USING btree (groupid, classnameid, classtypeid, type_, status);
CREATE UNIQUE INDEX ix_34c0ef1b ON public.layoutpagetemplateentry USING btree (uuid_, groupid);
CREATE INDEX ix_4bcac4b0 ON public.layoutpagetemplateentry USING btree (groupid, layoutpagetemplatecollectionid, type_);
CREATE INDEX ix_4c3a286a ON public.layoutpagetemplateentry USING btree (groupid, layoutpagetemplatecollectionid, name, status);
CREATE INDEX ix_6120ee7e ON public.layoutpagetemplateentry USING btree (groupid, layoutprototypeid);
CREATE INDEX ix_957f6c5d ON public.layoutpagetemplateentry USING btree (groupid, classnameid, classtypeid, defaulttemplate, status);
CREATE UNIQUE INDEX ix_a075daa4 ON public.layoutpagetemplateentry USING btree (groupid, name);
CREATE INDEX ix_a185457e ON public.layoutpagetemplateentry USING btree (layoutprototypeid);
CREATE INDEX ix_a4733f6b ON public.layoutpagetemplateentry USING btree (groupid, layoutpagetemplatecollectionid, status);
CREATE INDEX ix_cec0a659 ON public.layoutpagetemplateentry USING btree (uuid_, companyid);
CREATE INDEX ix_e2488048 ON public.layoutpagetemplateentry USING btree (groupid, classnameid, classtypeid, name, type_, status);

-- Drop table

-- DROP TABLE public.layoutprototype

CREATE TABLE public.layoutprototype (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	layoutprototypeid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name text NULL,
	description text NULL,
	settings_ text NULL,
	active_ bool NULL,
	CONSTRAINT layoutprototype_pkey PRIMARY KEY (layoutprototypeid)
);
CREATE INDEX ix_557a639f ON public.layoutprototype USING btree (companyid, active_);
CREATE INDEX ix_63ed2532 ON public.layoutprototype USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.layoutrevision

CREATE TABLE public.layoutrevision (
	mvccversion int8 NOT NULL DEFAULT 0,
	layoutrevisionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	layoutsetbranchid int8 NULL,
	layoutbranchid int8 NULL,
	parentlayoutrevisionid int8 NULL,
	head bool NULL,
	major bool NULL,
	plid int8 NULL,
	privatelayout bool NULL,
	name text NULL,
	title text NULL,
	description text NULL,
	keywords text NULL,
	robots text NULL,
	typesettings text NULL,
	iconimageid int8 NULL,
	themeid varchar(75) NULL,
	colorschemeid varchar(75) NULL,
	css text NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT layoutrevision_pkey PRIMARY KEY (layoutrevisionid)
);
CREATE INDEX ix_13984800 ON public.layoutrevision USING btree (layoutsetbranchid, layoutbranchid, plid);
CREATE INDEX ix_38c5df14 ON public.layoutrevision USING btree (layoutsetbranchid, layoutbranchid, head, plid);
CREATE INDEX ix_43e8286a ON public.layoutrevision USING btree (head, plid);
CREATE INDEX ix_4a84af43 ON public.layoutrevision USING btree (layoutsetbranchid, parentlayoutrevisionid, plid);
CREATE INDEX ix_70da9ecb ON public.layoutrevision USING btree (layoutsetbranchid, plid, status);
CREATE INDEX ix_7ffae700 ON public.layoutrevision USING btree (layoutsetbranchid, status);
CREATE INDEX ix_8ec3d2bc ON public.layoutrevision USING btree (plid, status);
CREATE INDEX ix_9ec9f954 ON public.layoutrevision USING btree (layoutsetbranchid, head, status);
CREATE INDEX ix_e10ac39 ON public.layoutrevision USING btree (layoutsetbranchid, head, plid);

-- Drop table

-- DROP TABLE public.layoutset

CREATE TABLE public.layoutset (
	mvccversion int8 NOT NULL DEFAULT 0,
	layoutsetid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	privatelayout bool NULL,
	logoid int8 NULL,
	themeid varchar(75) NULL,
	colorschemeid varchar(75) NULL,
	css text NULL,
	pagecount int4 NULL,
	settings_ text NULL,
	layoutsetprototypeuuid varchar(75) NULL,
	layoutsetprototypelinkenabled bool NULL,
	CONSTRAINT layoutset_pkey PRIMARY KEY (layoutsetid)
);
CREATE INDEX ix_1b698d9 ON public.layoutset USING btree (privatelayout, logoid);
CREATE UNIQUE INDEX ix_48550691 ON public.layoutset USING btree (groupid, privatelayout);
CREATE INDEX ix_72bba8b7 ON public.layoutset USING btree (layoutsetprototypeuuid);

-- Drop table

-- DROP TABLE public.layoutsetbranch

CREATE TABLE public.layoutsetbranch (
	mvccversion int8 NOT NULL DEFAULT 0,
	layoutsetbranchid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	privatelayout bool NULL,
	name varchar(75) NULL,
	description text NULL,
	master bool NULL,
	logoid int8 NULL,
	themeid varchar(75) NULL,
	colorschemeid varchar(75) NULL,
	css text NULL,
	settings_ text NULL,
	layoutsetprototypeuuid varchar(75) NULL,
	layoutsetprototypelinkenabled bool NULL,
	CONSTRAINT layoutsetbranch_pkey PRIMARY KEY (layoutsetbranchid)
);
CREATE UNIQUE INDEX ix_5ff18552 ON public.layoutsetbranch USING btree (groupid, privatelayout, name);
CREATE INDEX ix_ccf0da29 ON public.layoutsetbranch USING btree (groupid, privatelayout, master);

-- Drop table

-- DROP TABLE public.layoutsetprototype

CREATE TABLE public.layoutsetprototype (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	layoutsetprototypeid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name text NULL,
	description text NULL,
	settings_ text NULL,
	active_ bool NULL,
	CONSTRAINT layoutsetprototype_pkey PRIMARY KEY (layoutsetprototypeid)
);
CREATE INDEX ix_9178fc71 ON public.layoutsetprototype USING btree (companyid, active_);
CREATE INDEX ix_d9ffca84 ON public.layoutsetprototype USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.listtype

CREATE TABLE public.listtype (
	mvccversion int8 NOT NULL DEFAULT 0,
	listtypeid int8 NOT NULL,
	name varchar(75) NULL,
	type_ varchar(75) NULL,
	CONSTRAINT listtype_pkey PRIMARY KEY (listtypeid)
);
CREATE INDEX ix_2932dd37 ON public.listtype USING btree (type_);
CREATE INDEX ix_77729718 ON public.listtype USING btree (name, type_);

-- Drop table

-- DROP TABLE public.lock_

CREATE TABLE public.lock_ (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	lockid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	classname varchar(75) NULL,
	key_ varchar(200) NULL,
	"owner" varchar(1024) NULL,
	inheritable bool NULL,
	expirationdate timestamp NULL,
	CONSTRAINT lock__pkey PRIMARY KEY (lockid)
);
CREATE UNIQUE INDEX ix_228562ad ON public.lock_ USING btree (classname, key_);
CREATE INDEX ix_2c418eae ON public.lock_ USING btree (uuid_, companyid);
CREATE INDEX ix_e3f1286b ON public.lock_ USING btree (expirationdate);

-- Drop table

-- DROP TABLE public.marketplace_app

CREATE TABLE public.marketplace_app (
	uuid_ varchar(75) NULL,
	appid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	remoteappid int8 NULL,
	title varchar(75) NULL,
	description text NULL,
	category varchar(75) NULL,
	iconurl text NULL,
	"version" varchar(75) NULL,
	required bool NULL,
	CONSTRAINT marketplace_app_pkey PRIMARY KEY (appid)
);
CREATE INDEX ix_20f14d93 ON public.marketplace_app USING btree (remoteappid);
CREATE INDEX ix_865b7bd5 ON public.marketplace_app USING btree (companyid);
CREATE INDEX ix_94a7ef25 ON public.marketplace_app USING btree (category);
CREATE INDEX ix_a7807da7 ON public.marketplace_app USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.marketplace_module

CREATE TABLE public.marketplace_module (
	uuid_ varchar(75) NULL,
	moduleid int8 NOT NULL,
	companyid int8 NULL,
	appid int8 NULL,
	bundlesymbolicname varchar(500) NULL,
	bundleversion varchar(75) NULL,
	contextname varchar(75) NULL,
	CONSTRAINT marketplace_module_pkey PRIMARY KEY (moduleid)
);
CREATE INDEX ix_5848f52d ON public.marketplace_module USING btree (appid, bundlesymbolicname, bundleversion);
CREATE INDEX ix_896a375a ON public.marketplace_module USING btree (uuid_, companyid);
CREATE INDEX ix_c6938724 ON public.marketplace_module USING btree (appid, contextname);
CREATE INDEX ix_dd03d499 ON public.marketplace_module USING btree (bundlesymbolicname);
CREATE INDEX ix_f2f1e964 ON public.marketplace_module USING btree (contextname);

-- Drop table

-- DROP TABLE public.mbban

CREATE TABLE public.mbban (
	uuid_ varchar(75) NULL,
	banid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	banuserid int8 NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT mbban_pkey PRIMARY KEY (banid)
);
CREATE UNIQUE INDEX ix_2a3b68f6 ON public.mbban USING btree (uuid_, groupid);
CREATE INDEX ix_48814bba ON public.mbban USING btree (userid);
CREATE INDEX ix_4f841574 ON public.mbban USING btree (uuid_, companyid);
CREATE INDEX ix_69951a25 ON public.mbban USING btree (banuserid);
CREATE UNIQUE INDEX ix_8abc4e3b ON public.mbban USING btree (groupid, banuserid);

-- Drop table

-- DROP TABLE public.mbcategory

CREATE TABLE public.mbcategory (
	uuid_ varchar(75) NULL,
	categoryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	parentcategoryid int8 NULL,
	name varchar(75) NULL,
	description text NULL,
	displaystyle varchar(75) NULL,
	threadcount int4 NULL,
	messagecount int4 NULL,
	lastpostdate timestamp NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT mbcategory_pkey PRIMARY KEY (categoryid)
);
CREATE INDEX ix_13df4e6d ON public.mbcategory USING btree (uuid_, companyid);
CREATE INDEX ix_c295dbee ON public.mbcategory USING btree (groupid, parentcategoryid, status);
CREATE INDEX ix_d1642361 ON public.mbcategory USING btree (categoryid, groupid, parentcategoryid, status);
CREATE INDEX ix_da84a9f7 ON public.mbcategory USING btree (groupid, status);
CREATE INDEX ix_e15a5db5 ON public.mbcategory USING btree (companyid, status);
CREATE UNIQUE INDEX ix_f7d28c2f ON public.mbcategory USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.mbdiscussion

CREATE TABLE public.mbdiscussion (
	uuid_ varchar(75) NULL,
	discussionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	threadid int8 NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT mbdiscussion_pkey PRIMARY KEY (discussionid)
);
CREATE UNIQUE INDEX ix_33a4de38 ON public.mbdiscussion USING btree (classnameid, classpk);
CREATE INDEX ix_7e965757 ON public.mbdiscussion USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_b5ca2dc ON public.mbdiscussion USING btree (threadid);
CREATE UNIQUE INDEX ix_f7aac799 ON public.mbdiscussion USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.mbmailinglist

CREATE TABLE public.mbmailinglist (
	uuid_ varchar(75) NULL,
	mailinglistid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	categoryid int8 NULL,
	emailaddress varchar(254) NULL,
	inprotocol varchar(75) NULL,
	inservername varchar(75) NULL,
	inserverport int4 NULL,
	inusessl bool NULL,
	inusername varchar(75) NULL,
	inpassword varchar(75) NULL,
	inreadinterval int4 NULL,
	outemailaddress varchar(254) NULL,
	outcustom bool NULL,
	outservername varchar(75) NULL,
	outserverport int4 NULL,
	outusessl bool NULL,
	outusername varchar(75) NULL,
	outpassword varchar(75) NULL,
	allowanonymous bool NULL,
	active_ bool NULL,
	CONSTRAINT mbmailinglist_pkey PRIMARY KEY (mailinglistid)
);
CREATE UNIQUE INDEX ix_76ce9cdd ON public.mbmailinglist USING btree (groupid, categoryid);
CREATE INDEX ix_bfeb984f ON public.mbmailinglist USING btree (active_);
CREATE UNIQUE INDEX ix_e858f170 ON public.mbmailinglist USING btree (uuid_, groupid);
CREATE INDEX ix_fc61676e ON public.mbmailinglist USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.mbmessage

CREATE TABLE public.mbmessage (
	uuid_ varchar(75) NULL,
	messageid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	categoryid int8 NULL,
	threadid int8 NULL,
	rootmessageid int8 NULL,
	parentmessageid int8 NULL,
	subject varchar(75) NULL,
	body text NULL,
	format varchar(75) NULL,
	anonymous bool NULL,
	priority float8 NULL,
	allowpingbacks bool NULL,
	answer bool NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT mbmessage_pkey PRIMARY KEY (messageid)
);
CREATE INDEX ix_1ad93c16 ON public.mbmessage USING btree (companyid, status);
CREATE INDEX ix_3321f142 ON public.mbmessage USING btree (userid, classnameid, status);
CREATE INDEX ix_377858d2 ON public.mbmessage USING btree (groupid, userid, status);
CREATE INDEX ix_385e123e ON public.mbmessage USING btree (groupid, categoryid, threadid, status);
CREATE INDEX ix_4257db85 ON public.mbmessage USING btree (groupid, categoryid, status);
CREATE INDEX ix_4a4bb4ed ON public.mbmessage USING btree (userid, classnameid, classpk, status);
CREATE INDEX ix_57ca9fec ON public.mbmessage USING btree (uuid_, companyid);
CREATE INDEX ix_6a095f16 ON public.mbmessage USING btree (parentmessageid, status);
CREATE UNIQUE INDEX ix_8d12316e ON public.mbmessage USING btree (uuid_, groupid);
CREATE INDEX ix_9d7c3b23 ON public.mbmessage USING btree (threadid, answer);
CREATE INDEX ix_9dc8e57 ON public.mbmessage USING btree (threadid, status);
CREATE INDEX ix_a7038cd7 ON public.mbmessage USING btree (threadid, parentmessageid);
CREATE INDEX ix_cbfdbf0a ON public.mbmessage USING btree (groupid, categoryid, threadid, answer);
CREATE INDEX ix_ed39ac98 ON public.mbmessage USING btree (groupid, status);
CREATE INDEX ix_f6687633 ON public.mbmessage USING btree (classnameid, classpk, status);

-- Drop table

-- DROP TABLE public.mbstatsuser

CREATE TABLE public.mbstatsuser (
	statsuserid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	messagecount int4 NULL,
	lastpostdate timestamp NULL,
	CONSTRAINT mbstatsuser_pkey PRIMARY KEY (statsuserid)
);
CREATE INDEX ix_847f92b5 ON public.mbstatsuser USING btree (userid);
CREATE UNIQUE INDEX ix_9168e2c9 ON public.mbstatsuser USING btree (groupid, userid);

-- Drop table

-- DROP TABLE public.mbthread

CREATE TABLE public.mbthread (
	uuid_ varchar(75) NULL,
	threadid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	categoryid int8 NULL,
	rootmessageid int8 NULL,
	rootmessageuserid int8 NULL,
	title varchar(75) NULL,
	messagecount int4 NULL,
	viewcount int4 NULL,
	lastpostbyuserid int8 NULL,
	lastpostdate timestamp NULL,
	priority float8 NULL,
	question bool NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT mbthread_pkey PRIMARY KEY (threadid)
);
CREATE UNIQUE INDEX ix_3a200b7b ON public.mbthread USING btree (uuid_, groupid);
CREATE INDEX ix_41f6dc8a ON public.mbthread USING btree (categoryid, priority);
CREATE INDEX ix_485f7e98 ON public.mbthread USING btree (groupid, categoryid, status);
CREATE INDEX ix_50f1904a ON public.mbthread USING btree (groupid, categoryid, lastpostdate);
CREATE INDEX ix_aedd9cb5 ON public.mbthread USING btree (lastpostdate, priority);
CREATE INDEX ix_cc993ecb ON public.mbthread USING btree (rootmessageid);
CREATE INDEX ix_e1e7142b ON public.mbthread USING btree (groupid, status);
CREATE INDEX ix_f8ca2ab9 ON public.mbthread USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.mbthreadflag

CREATE TABLE public.mbthreadflag (
	uuid_ varchar(75) NULL,
	threadflagid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	threadid int8 NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT mbthreadflag_pkey PRIMARY KEY (threadflagid)
);
CREATE UNIQUE INDEX ix_33781904 ON public.mbthreadflag USING btree (userid, threadid);
CREATE INDEX ix_8cb0a24a ON public.mbthreadflag USING btree (threadid);
CREATE INDEX ix_dce308c5 ON public.mbthreadflag USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_feb0fc87 ON public.mbthreadflag USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.mdraction

CREATE TABLE public.mdraction (
	uuid_ varchar(75) NULL,
	actionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	rulegroupinstanceid int8 NULL,
	name text NULL,
	description text NULL,
	type_ varchar(255) NULL,
	typesettings text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT mdraction_pkey PRIMARY KEY (actionid)
);
CREATE UNIQUE INDEX ix_75be36ad ON public.mdraction USING btree (uuid_, groupid);
CREATE INDEX ix_c58a516b ON public.mdraction USING btree (uuid_, companyid);
CREATE INDEX ix_fd90786c ON public.mdraction USING btree (rulegroupinstanceid);

-- Drop table

-- DROP TABLE public.mdrrule

CREATE TABLE public.mdrrule (
	uuid_ varchar(75) NULL,
	ruleid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	rulegroupid int8 NULL,
	name text NULL,
	description text NULL,
	type_ varchar(255) NULL,
	typesettings text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT mdrrule_pkey PRIMARY KEY (ruleid)
);
CREATE INDEX ix_4f4293f1 ON public.mdrrule USING btree (rulegroupid);
CREATE INDEX ix_7dea8df1 ON public.mdrrule USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_f3efdcb3 ON public.mdrrule USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.mdrrulegroup

CREATE TABLE public.mdrrulegroup (
	uuid_ varchar(75) NULL,
	rulegroupid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name text NULL,
	description text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT mdrrulegroup_pkey PRIMARY KEY (rulegroupid)
);
CREATE UNIQUE INDEX ix_46665cc4 ON public.mdrrulegroup USING btree (uuid_, groupid);
CREATE INDEX ix_5849891c ON public.mdrrulegroup USING btree (groupid);
CREATE INDEX ix_cc14dc2 ON public.mdrrulegroup USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.mdrrulegroupinstance

CREATE TABLE public.mdrrulegroupinstance (
	uuid_ varchar(75) NULL,
	rulegroupinstanceid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	rulegroupid int8 NULL,
	priority int4 NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT mdrrulegroupinstance_pkey PRIMARY KEY (rulegroupinstanceid)
);
CREATE INDEX ix_22dab85c ON public.mdrrulegroupinstance USING btree (groupid, classnameid, classpk);
CREATE INDEX ix_25c9d1f7 ON public.mdrrulegroupinstance USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_808a0036 ON public.mdrrulegroupinstance USING btree (classnameid, classpk, rulegroupid);
CREATE UNIQUE INDEX ix_9cbc6a39 ON public.mdrrulegroupinstance USING btree (uuid_, groupid);
CREATE INDEX ix_bf3e642b ON public.mdrrulegroupinstance USING btree (rulegroupid);

-- Drop table

-- DROP TABLE public.membershiprequest

CREATE TABLE public.membershiprequest (
	mvccversion int8 NOT NULL DEFAULT 0,
	membershiprequestid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	createdate timestamp NULL,
	"comments" text NULL,
	replycomments text NULL,
	replydate timestamp NULL,
	replieruserid int8 NULL,
	statusid int8 NULL,
	CONSTRAINT membershiprequest_pkey PRIMARY KEY (membershiprequestid)
);
CREATE INDEX ix_35aa8fa6 ON public.membershiprequest USING btree (groupid, userid, statusid);
CREATE INDEX ix_66d70879 ON public.membershiprequest USING btree (userid);
CREATE INDEX ix_c28c72ec ON public.membershiprequest USING btree (groupid, statusid);

-- Drop table

-- DROP TABLE public.oa2auths_oa2scopegrants

CREATE TABLE public.oa2auths_oa2scopegrants (
	companyid int8 NOT NULL,
	oauth2authorizationid int8 NOT NULL,
	oauth2scopegrantid int8 NOT NULL,
	CONSTRAINT oa2auths_oa2scopegrants_pkey PRIMARY KEY (oauth2authorizationid, oauth2scopegrantid)
);
CREATE INDEX ix_2f541817 ON public.oa2auths_oa2scopegrants USING btree (oauth2scopegrantid);
CREATE INDEX ix_87daf9c3 ON public.oa2auths_oa2scopegrants USING btree (companyid);
CREATE INDEX ix_f4c82f24 ON public.oa2auths_oa2scopegrants USING btree (oauth2authorizationid);

-- Drop table

-- DROP TABLE public.oauth2application

CREATE TABLE public.oauth2application (
	oauth2applicationid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	oa2ascopealiasesid int8 NULL,
	allowedgranttypes varchar(75) NULL,
	clientid varchar(75) NULL,
	clientprofile int4 NULL,
	clientsecret varchar(75) NULL,
	description text NULL,
	features text NULL,
	homepageurl text NULL,
	iconfileentryid int8 NULL,
	name varchar(75) NULL,
	privacypolicyurl text NULL,
	redirecturis text NULL,
	CONSTRAINT oauth2application_pkey PRIMARY KEY (oauth2applicationid)
);
CREATE INDEX ix_523e5c67 ON public.oauth2application USING btree (companyid, clientid);

-- Drop table

-- DROP TABLE public.oauth2applicationscopealiases

CREATE TABLE public.oauth2applicationscopealiases (
	oa2ascopealiasesid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	oauth2applicationid int8 NULL,
	scopealiases text NULL,
	scopealiaseshash int8 NULL,
	CONSTRAINT oauth2applicationscopealiases_pkey PRIMARY KEY (oa2ascopealiasesid)
);
CREATE INDEX ix_282ece83 ON public.oauth2applicationscopealiases USING btree (companyid);
CREATE INDEX ix_29847127 ON public.oauth2applicationscopealiases USING btree (oauth2applicationid, scopealiaseshash);

-- Drop table

-- DROP TABLE public.oauth2authorization

CREATE TABLE public.oauth2authorization (
	oauth2authorizationid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	oauth2applicationid int8 NULL,
	oa2ascopealiasesid int8 NULL,
	accesstokencontent text NULL,
	accesstokencontenthash int8 NULL,
	accesstokencreatedate timestamp NULL,
	accesstokenexpirationdate timestamp NULL,
	remoteipinfo varchar(75) NULL,
	refreshtokencontent text NULL,
	refreshtokencontenthash int8 NULL,
	refreshtokencreatedate timestamp NULL,
	refreshtokenexpirationdate timestamp NULL,
	CONSTRAINT oauth2authorization_pkey PRIMARY KEY (oauth2authorizationid)
);
CREATE INDEX ix_10c77bd5 ON public.oauth2authorization USING btree (refreshtokencontenthash);
CREATE INDEX ix_70dd169c ON public.oauth2authorization USING btree (oauth2applicationid);
CREATE INDEX ix_719d503e ON public.oauth2authorization USING btree (userid);
CREATE INDEX ix_77d3b9ea ON public.oauth2authorization USING btree (accesstokencontenthash);

-- Drop table

-- DROP TABLE public.oauth2scopegrant

CREATE TABLE public.oauth2scopegrant (
	oauth2scopegrantid int8 NOT NULL,
	companyid int8 NULL,
	oa2ascopealiasesid int8 NULL,
	applicationname varchar(255) NULL,
	bundlesymbolicname varchar(255) NULL,
	"scope" varchar(255) NULL,
	CONSTRAINT oauth2scopegrant_pkey PRIMARY KEY (oauth2scopegrantid)
);
CREATE INDEX ix_80fcac23 ON public.oauth2scopegrant USING btree (oa2ascopealiasesid);
CREATE INDEX ix_88938bf ON public.oauth2scopegrant USING btree (companyid, oa2ascopealiasesid, applicationname, bundlesymbolicname, scope);

-- Drop table

-- DROP TABLE public.organization_

CREATE TABLE public.organization_ (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	externalreferencecode varchar(75) NULL,
	organizationid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	parentorganizationid int8 NULL,
	treepath text NULL,
	name varchar(100) NULL,
	type_ varchar(75) NULL,
	recursable bool NULL,
	regionid int8 NULL,
	countryid int8 NULL,
	statusid int8 NULL,
	"comments" text NULL,
	logoid int8 NULL,
	CONSTRAINT organization__pkey PRIMARY KEY (organizationid)
);
CREATE INDEX ix_418e4522 ON public.organization_ USING btree (companyid, parentorganizationid);
CREATE INDEX ix_6b83f1c7 ON public.organization_ USING btree (companyid, externalreferencecode);
CREATE INDEX ix_a9d85ba6 ON public.organization_ USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_e301bdf5 ON public.organization_ USING btree (companyid, name);

-- Drop table

-- DROP TABLE public.orggrouprole

CREATE TABLE public.orggrouprole (
	mvccversion int8 NOT NULL DEFAULT 0,
	organizationid int8 NOT NULL,
	groupid int8 NOT NULL,
	roleid int8 NOT NULL,
	companyid int8 NULL,
	CONSTRAINT orggrouprole_pkey PRIMARY KEY (organizationid, groupid, roleid)
);
CREATE INDEX ix_4a527dd3 ON public.orggrouprole USING btree (groupid);
CREATE INDEX ix_ab044d1c ON public.orggrouprole USING btree (roleid);

-- Drop table

-- DROP TABLE public.orglabor

CREATE TABLE public.orglabor (
	mvccversion int8 NOT NULL DEFAULT 0,
	orglaborid int8 NOT NULL,
	companyid int8 NULL,
	organizationid int8 NULL,
	typeid int8 NULL,
	sunopen int4 NULL,
	sunclose int4 NULL,
	monopen int4 NULL,
	monclose int4 NULL,
	tueopen int4 NULL,
	tueclose int4 NULL,
	wedopen int4 NULL,
	wedclose int4 NULL,
	thuopen int4 NULL,
	thuclose int4 NULL,
	friopen int4 NULL,
	friclose int4 NULL,
	satopen int4 NULL,
	satclose int4 NULL,
	CONSTRAINT orglabor_pkey PRIMARY KEY (orglaborid)
);
CREATE INDEX ix_6af0d434 ON public.orglabor USING btree (organizationid);

-- Drop table

-- DROP TABLE public.passwordpolicy

CREATE TABLE public.passwordpolicy (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	passwordpolicyid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	defaultpolicy bool NULL,
	name varchar(75) NULL,
	description text NULL,
	changeable bool NULL,
	changerequired bool NULL,
	minage int8 NULL,
	checksyntax bool NULL,
	allowdictionarywords bool NULL,
	minalphanumeric int4 NULL,
	minlength int4 NULL,
	minlowercase int4 NULL,
	minnumbers int4 NULL,
	minsymbols int4 NULL,
	minuppercase int4 NULL,
	regex varchar(75) NULL,
	history bool NULL,
	historycount int4 NULL,
	expireable bool NULL,
	maxage int8 NULL,
	warningtime int8 NULL,
	gracelimit int4 NULL,
	lockout bool NULL,
	maxfailure int4 NULL,
	lockoutduration int8 NULL,
	requireunlock bool NULL,
	resetfailurecount int8 NULL,
	resetticketmaxage int8 NULL,
	CONSTRAINT passwordpolicy_pkey PRIMARY KEY (passwordpolicyid)
);
CREATE INDEX ix_2c1142e ON public.passwordpolicy USING btree (companyid, defaultpolicy);
CREATE UNIQUE INDEX ix_3fbfa9f4 ON public.passwordpolicy USING btree (companyid, name);
CREATE INDEX ix_e4d7ef87 ON public.passwordpolicy USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.passwordpolicyrel

CREATE TABLE public.passwordpolicyrel (
	mvccversion int8 NOT NULL DEFAULT 0,
	passwordpolicyrelid int8 NOT NULL,
	companyid int8 NULL,
	passwordpolicyid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	CONSTRAINT passwordpolicyrel_pkey PRIMARY KEY (passwordpolicyrelid)
);
CREATE UNIQUE INDEX ix_c3a17327 ON public.passwordpolicyrel USING btree (classnameid, classpk);
CREATE INDEX ix_cd25266e ON public.passwordpolicyrel USING btree (passwordpolicyid);

-- Drop table

-- DROP TABLE public.passwordtracker

CREATE TABLE public.passwordtracker (
	mvccversion int8 NOT NULL DEFAULT 0,
	passwordtrackerid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	createdate timestamp NULL,
	password_ varchar(75) NULL,
	CONSTRAINT passwordtracker_pkey PRIMARY KEY (passwordtrackerid)
);
CREATE INDEX ix_326f75bd ON public.passwordtracker USING btree (userid);

-- Drop table

-- DROP TABLE public.phone

CREATE TABLE public.phone (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	phoneid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	number_ varchar(75) NULL,
	"extension" varchar(75) NULL,
	typeid int8 NULL,
	primary_ bool NULL,
	CONSTRAINT phone_pkey PRIMARY KEY (phoneid)
);
CREATE INDEX ix_812ce07a ON public.phone USING btree (companyid, classnameid, classpk, primary_);
CREATE INDEX ix_b271fa88 ON public.phone USING btree (uuid_, companyid);
CREATE INDEX ix_f202b9ce ON public.phone USING btree (userid);

-- Drop table

-- DROP TABLE public.pluginsetting

CREATE TABLE public.pluginsetting (
	mvccversion int8 NOT NULL DEFAULT 0,
	pluginsettingid int8 NOT NULL,
	companyid int8 NULL,
	pluginid varchar(75) NULL,
	plugintype varchar(75) NULL,
	roles text NULL,
	active_ bool NULL,
	CONSTRAINT pluginsetting_pkey PRIMARY KEY (pluginsettingid)
);
CREATE UNIQUE INDEX ix_7171b2e8 ON public.pluginsetting USING btree (companyid, pluginid, plugintype);

-- Drop table

-- DROP TABLE public.pollschoice

CREATE TABLE public.pollschoice (
	uuid_ varchar(75) NULL,
	choiceid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	questionid int8 NULL,
	name varchar(75) NULL,
	description text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT pollschoice_pkey PRIMARY KEY (choiceid)
);
CREATE INDEX ix_8ae746ef ON public.pollschoice USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_c222bd31 ON public.pollschoice USING btree (uuid_, groupid);
CREATE UNIQUE INDEX ix_d76dd2cf ON public.pollschoice USING btree (questionid, name);

-- Drop table

-- DROP TABLE public.pollsquestion

CREATE TABLE public.pollsquestion (
	uuid_ varchar(75) NULL,
	questionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	title text NULL,
	description text NULL,
	expirationdate timestamp NULL,
	lastpublishdate timestamp NULL,
	lastvotedate timestamp NULL,
	CONSTRAINT pollsquestion_pkey PRIMARY KEY (questionid)
);
CREATE INDEX ix_9ff342ea ON public.pollsquestion USING btree (groupid);
CREATE UNIQUE INDEX ix_f3c9f36 ON public.pollsquestion USING btree (uuid_, groupid);
CREATE INDEX ix_f910bbb4 ON public.pollsquestion USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.pollsvote

CREATE TABLE public.pollsvote (
	uuid_ varchar(75) NULL,
	voteid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	questionid int8 NULL,
	choiceid int8 NULL,
	lastpublishdate timestamp NULL,
	votedate timestamp NULL,
	CONSTRAINT pollsvote_pkey PRIMARY KEY (voteid)
);
CREATE INDEX ix_1bbfd4d3 ON public.pollsvote USING btree (questionid, userid);
CREATE INDEX ix_7d8e92b8 ON public.pollsvote USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_a88c673a ON public.pollsvote USING btree (uuid_, groupid);
CREATE INDEX ix_d5df7b54 ON public.pollsvote USING btree (choiceid);

-- Drop table

-- DROP TABLE public.portalpreferences

CREATE TABLE public.portalpreferences (
	mvccversion int8 NOT NULL DEFAULT 0,
	portalpreferencesid int8 NOT NULL,
	ownerid int8 NULL,
	ownertype int4 NULL,
	preferences text NULL,
	CONSTRAINT portalpreferences_pkey PRIMARY KEY (portalpreferencesid)
);
CREATE INDEX ix_d1f795f1 ON public.portalpreferences USING btree (ownerid, ownertype);

-- Drop table

-- DROP TABLE public.portlet

CREATE TABLE public.portlet (
	mvccversion int8 NOT NULL DEFAULT 0,
	id_ int8 NOT NULL,
	companyid int8 NULL,
	portletid varchar(200) NULL,
	roles text NULL,
	active_ bool NULL,
	CONSTRAINT portlet_pkey PRIMARY KEY (id_)
);
CREATE UNIQUE INDEX ix_12b5e51d ON public.portlet USING btree (companyid, portletid);

-- Drop table

-- DROP TABLE public.portletitem

CREATE TABLE public.portletitem (
	mvccversion int8 NOT NULL DEFAULT 0,
	portletitemid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name varchar(75) NULL,
	portletid varchar(200) NULL,
	classnameid int8 NULL,
	CONSTRAINT portletitem_pkey PRIMARY KEY (portletitemid)
);
CREATE INDEX ix_96bdd537 ON public.portletitem USING btree (groupid, classnameid);
CREATE INDEX ix_d699243f ON public.portletitem USING btree (groupid, name, portletid, classnameid);
CREATE INDEX ix_e922d6c0 ON public.portletitem USING btree (groupid, portletid, classnameid);

-- Drop table

-- DROP TABLE public.portletpreferences

CREATE TABLE public.portletpreferences (
	mvccversion int8 NOT NULL DEFAULT 0,
	portletpreferencesid int8 NOT NULL,
	companyid int8 NULL,
	ownerid int8 NULL,
	ownertype int4 NULL,
	plid int8 NULL,
	portletid varchar(200) NULL,
	preferences text NULL,
	CONSTRAINT portletpreferences_pkey PRIMARY KEY (portletpreferencesid)
);
CREATE INDEX ix_60c49142 ON public.portletpreferences USING btree (companyid, ownerid, ownertype, portletid);
CREATE INDEX ix_8e6da3a1 ON public.portletpreferences USING btree (portletid);
CREATE INDEX ix_a3b2a80c ON public.portletpreferences USING btree (ownertype, portletid);
CREATE UNIQUE INDEX ix_c7057ff7 ON public.portletpreferences USING btree (ownerid, ownertype, plid, portletid);
CREATE INDEX ix_c9a3fce2 ON public.portletpreferences USING btree (ownerid, ownertype, portletid);
CREATE INDEX ix_d340db76 ON public.portletpreferences USING btree (plid, portletid);
CREATE INDEX ix_d5eda3a1 ON public.portletpreferences USING btree (ownertype, plid, portletid);

-- Drop table

-- DROP TABLE public.quartz_blob_triggers

CREATE TABLE public.quartz_blob_triggers (
	sched_name varchar(120) NOT NULL,
	trigger_name varchar(200) NOT NULL,
	trigger_group varchar(200) NOT NULL,
	blob_data bytea NULL,
	CONSTRAINT quartz_blob_triggers_pkey PRIMARY KEY (sched_name, trigger_name, trigger_group)
);

-- Drop table

-- DROP TABLE public.quartz_calendars

CREATE TABLE public.quartz_calendars (
	sched_name varchar(120) NOT NULL,
	calendar_name varchar(200) NOT NULL,
	calendar bytea NOT NULL,
	CONSTRAINT quartz_calendars_pkey PRIMARY KEY (sched_name, calendar_name)
);

-- Drop table

-- DROP TABLE public.quartz_cron_triggers

CREATE TABLE public.quartz_cron_triggers (
	sched_name varchar(120) NOT NULL,
	trigger_name varchar(200) NOT NULL,
	trigger_group varchar(200) NOT NULL,
	cron_expression varchar(200) NOT NULL,
	time_zone_id varchar(80) NULL,
	CONSTRAINT quartz_cron_triggers_pkey PRIMARY KEY (sched_name, trigger_name, trigger_group)
);

-- Drop table

-- DROP TABLE public.quartz_fired_triggers

CREATE TABLE public.quartz_fired_triggers (
	sched_name varchar(120) NOT NULL,
	entry_id varchar(95) NOT NULL,
	trigger_name varchar(200) NOT NULL,
	trigger_group varchar(200) NOT NULL,
	instance_name varchar(200) NOT NULL,
	fired_time int8 NOT NULL,
	priority int4 NOT NULL,
	state varchar(16) NOT NULL,
	job_name varchar(200) NULL,
	job_group varchar(200) NULL,
	is_nonconcurrent bool NULL,
	requests_recovery bool NULL,
	CONSTRAINT quartz_fired_triggers_pkey PRIMARY KEY (sched_name, entry_id)
);
CREATE INDEX ix_204d31e8 ON public.quartz_fired_triggers USING btree (sched_name, instance_name);
CREATE INDEX ix_339e078m ON public.quartz_fired_triggers USING btree (sched_name, instance_name, requests_recovery);
CREATE INDEX ix_4bd722bm ON public.quartz_fired_triggers USING btree (sched_name, trigger_group);
CREATE INDEX ix_5005e3af ON public.quartz_fired_triggers USING btree (sched_name, job_name, job_group);
CREATE INDEX ix_bc2f03b0 ON public.quartz_fired_triggers USING btree (sched_name, job_group);
CREATE INDEX ix_be3835e5 ON public.quartz_fired_triggers USING btree (sched_name, trigger_name, trigger_group);

-- Drop table

-- DROP TABLE public.quartz_job_details

CREATE TABLE public.quartz_job_details (
	sched_name varchar(120) NOT NULL,
	job_name varchar(200) NOT NULL,
	job_group varchar(200) NOT NULL,
	description varchar(250) NULL,
	job_class_name varchar(250) NOT NULL,
	is_durable bool NOT NULL,
	is_nonconcurrent bool NOT NULL,
	is_update_data bool NOT NULL,
	requests_recovery bool NOT NULL,
	job_data bytea NULL,
	CONSTRAINT quartz_job_details_pkey PRIMARY KEY (sched_name, job_name, job_group)
);
CREATE INDEX ix_779bca37 ON public.quartz_job_details USING btree (sched_name, requests_recovery);
CREATE INDEX ix_88328984 ON public.quartz_job_details USING btree (sched_name, job_group);

-- Drop table

-- DROP TABLE public.quartz_locks

CREATE TABLE public.quartz_locks (
	sched_name varchar(120) NOT NULL,
	lock_name varchar(40) NOT NULL,
	CONSTRAINT quartz_locks_pkey PRIMARY KEY (sched_name, lock_name)
);

-- Drop table

-- DROP TABLE public.quartz_paused_trigger_grps

CREATE TABLE public.quartz_paused_trigger_grps (
	sched_name varchar(120) NOT NULL,
	trigger_group varchar(200) NOT NULL,
	CONSTRAINT quartz_paused_trigger_grps_pkey PRIMARY KEY (sched_name, trigger_group)
);

-- Drop table

-- DROP TABLE public.quartz_scheduler_state

CREATE TABLE public.quartz_scheduler_state (
	sched_name varchar(120) NOT NULL,
	instance_name varchar(200) NOT NULL,
	last_checkin_time int8 NOT NULL,
	checkin_interval int8 NOT NULL,
	CONSTRAINT quartz_scheduler_state_pkey PRIMARY KEY (sched_name, instance_name)
);

-- Drop table

-- DROP TABLE public.quartz_simple_triggers

CREATE TABLE public.quartz_simple_triggers (
	sched_name varchar(120) NOT NULL,
	trigger_name varchar(200) NOT NULL,
	trigger_group varchar(200) NOT NULL,
	repeat_count int8 NOT NULL,
	repeat_interval int8 NOT NULL,
	times_triggered int8 NOT NULL,
	CONSTRAINT quartz_simple_triggers_pkey PRIMARY KEY (sched_name, trigger_name, trigger_group)
);

-- Drop table

-- DROP TABLE public.quartz_simprop_triggers

CREATE TABLE public.quartz_simprop_triggers (
	sched_name varchar(120) NOT NULL,
	trigger_name varchar(200) NOT NULL,
	trigger_group varchar(200) NOT NULL,
	str_prop_1 varchar(512) NULL,
	str_prop_2 varchar(512) NULL,
	str_prop_3 varchar(512) NULL,
	int_prop_1 int4 NULL,
	int_prop_2 int4 NULL,
	long_prop_1 int8 NULL,
	long_prop_2 int8 NULL,
	dec_prop_1 numeric(13,4) NULL,
	dec_prop_2 numeric(13,4) NULL,
	bool_prop_1 bool NULL,
	bool_prop_2 bool NULL,
	CONSTRAINT quartz_simprop_triggers_pkey PRIMARY KEY (sched_name, trigger_name, trigger_group)
);

-- Drop table

-- DROP TABLE public.quartz_triggers

CREATE TABLE public.quartz_triggers (
	sched_name varchar(120) NOT NULL,
	trigger_name varchar(200) NOT NULL,
	trigger_group varchar(200) NOT NULL,
	job_name varchar(200) NOT NULL,
	job_group varchar(200) NOT NULL,
	description varchar(250) NULL,
	next_fire_time int8 NULL,
	prev_fire_time int8 NULL,
	priority int4 NULL,
	trigger_state varchar(16) NOT NULL,
	trigger_type varchar(8) NOT NULL,
	start_time int8 NOT NULL,
	end_time int8 NULL,
	calendar_name varchar(200) NULL,
	misfire_instr int4 NULL,
	job_data bytea NULL,
	CONSTRAINT quartz_triggers_pkey PRIMARY KEY (sched_name, trigger_name, trigger_group)
);
CREATE INDEX ix_186442a4 ON public.quartz_triggers USING btree (sched_name, trigger_name, trigger_group, trigger_state);
CREATE INDEX ix_1ba1f9dc ON public.quartz_triggers USING btree (sched_name, trigger_group);
CREATE INDEX ix_1f92813c ON public.quartz_triggers USING btree (sched_name, next_fire_time, misfire_instr);
CREATE INDEX ix_8aa50be1 ON public.quartz_triggers USING btree (sched_name, job_group);
CREATE INDEX ix_91ca7cce ON public.quartz_triggers USING btree (sched_name, trigger_group, next_fire_time, trigger_state, misfire_instr);
CREATE INDEX ix_99108b6e ON public.quartz_triggers USING btree (sched_name, trigger_state);
CREATE INDEX ix_a85822a0 ON public.quartz_triggers USING btree (sched_name, job_name, job_group);
CREATE INDEX ix_cd7132d0 ON public.quartz_triggers USING btree (sched_name, calendar_name);
CREATE INDEX ix_d219afde ON public.quartz_triggers USING btree (sched_name, trigger_group, trigger_state);
CREATE INDEX ix_eefe382a ON public.quartz_triggers USING btree (sched_name, next_fire_time);
CREATE INDEX ix_f026cf4c ON public.quartz_triggers USING btree (sched_name, next_fire_time, trigger_state);
CREATE INDEX ix_f2dd7c7e ON public.quartz_triggers USING btree (sched_name, next_fire_time, trigger_state, misfire_instr);

-- Drop table

-- DROP TABLE public.ratingsentry

CREATE TABLE public.ratingsentry (
	uuid_ varchar(75) NULL,
	entryid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	score float8 NULL,
	CONSTRAINT ratingsentry_pkey PRIMARY KEY (entryid)
);
CREATE INDEX ix_9f242df6 ON public.ratingsentry USING btree (uuid_, companyid);
CREATE INDEX ix_a1a8cb8b ON public.ratingsentry USING btree (classnameid, classpk, score);
CREATE UNIQUE INDEX ix_b47e3c11 ON public.ratingsentry USING btree (userid, classnameid, classpk);

-- Drop table

-- DROP TABLE public.ratingsstats

CREATE TABLE public.ratingsstats (
	statsid int8 NOT NULL,
	companyid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	totalentries int4 NULL,
	totalscore float8 NULL,
	averagescore float8 NULL,
	CONSTRAINT ratingsstats_pkey PRIMARY KEY (statsid)
);
CREATE UNIQUE INDEX ix_a6e99284 ON public.ratingsstats USING btree (classnameid, classpk);

-- Drop table

-- DROP TABLE public.readingtimeentry

CREATE TABLE public.readingtimeentry (
	uuid_ varchar(75) NULL,
	readingtimeentryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	readingtime int8 NULL,
	CONSTRAINT readingtimeentry_pkey PRIMARY KEY (readingtimeentryid)
);
CREATE INDEX ix_29faca53 ON public.readingtimeentry USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_73b13580 ON public.readingtimeentry USING btree (groupid, classnameid, classpk);
CREATE UNIQUE INDEX ix_d647c995 ON public.readingtimeentry USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.recentlayoutbranch

CREATE TABLE public.recentlayoutbranch (
	mvccversion int8 NOT NULL DEFAULT 0,
	recentlayoutbranchid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	layoutbranchid int8 NULL,
	layoutsetbranchid int8 NULL,
	plid int8 NULL,
	CONSTRAINT recentlayoutbranch_pkey PRIMARY KEY (recentlayoutbranchid)
);
CREATE INDEX ix_351e86e8 ON public.recentlayoutbranch USING btree (layoutbranchid);
CREATE INDEX ix_b91f79bd ON public.recentlayoutbranch USING btree (groupid);
CREATE UNIQUE INDEX ix_c27d6369 ON public.recentlayoutbranch USING btree (userid, layoutsetbranchid, plid);

-- Drop table

-- DROP TABLE public.recentlayoutrevision

CREATE TABLE public.recentlayoutrevision (
	mvccversion int8 NOT NULL DEFAULT 0,
	recentlayoutrevisionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	layoutrevisionid int8 NULL,
	layoutsetbranchid int8 NULL,
	plid int8 NULL,
	CONSTRAINT recentlayoutrevision_pkey PRIMARY KEY (recentlayoutrevisionid)
);
CREATE UNIQUE INDEX ix_4c600bd0 ON public.recentlayoutrevision USING btree (userid, layoutsetbranchid, plid);
CREATE INDEX ix_8d8a2724 ON public.recentlayoutrevision USING btree (groupid);
CREATE INDEX ix_da0788da ON public.recentlayoutrevision USING btree (layoutrevisionid);

-- Drop table

-- DROP TABLE public.recentlayoutsetbranch

CREATE TABLE public.recentlayoutsetbranch (
	mvccversion int8 NOT NULL DEFAULT 0,
	recentlayoutsetbranchid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	layoutsetbranchid int8 NULL,
	layoutsetid int8 NULL,
	CONSTRAINT recentlayoutsetbranch_pkey PRIMARY KEY (recentlayoutsetbranchid)
);
CREATE INDEX ix_23ff0700 ON public.recentlayoutsetbranch USING btree (layoutsetbranchid);
CREATE UNIQUE INDEX ix_4654d204 ON public.recentlayoutsetbranch USING btree (userid, layoutsetid);
CREATE INDEX ix_711995a5 ON public.recentlayoutsetbranch USING btree (groupid);

-- Drop table

-- DROP TABLE public.region

CREATE TABLE public.region (
	mvccversion int8 NOT NULL DEFAULT 0,
	regionid int8 NOT NULL,
	countryid int8 NULL,
	regioncode varchar(75) NULL,
	name varchar(75) NULL,
	active_ bool NULL,
	CONSTRAINT region_pkey PRIMARY KEY (regionid)
);
CREATE INDEX ix_11fb3e42 ON public.region USING btree (countryid, active_);
CREATE INDEX ix_2d9a426f ON public.region USING btree (active_);
CREATE UNIQUE INDEX ix_a2635f5c ON public.region USING btree (countryid, regioncode);

-- Drop table

-- DROP TABLE public.release_

CREATE TABLE public.release_ (
	mvccversion int8 NOT NULL DEFAULT 0,
	releaseid int8 NOT NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	servletcontextname varchar(75) NULL,
	schemaversion varchar(75) NULL,
	buildnumber int4 NULL,
	builddate timestamp NULL,
	verified bool NULL,
	state_ int4 NULL,
	teststring varchar(1024) NULL,
	CONSTRAINT release__pkey PRIMARY KEY (releaseid)
);
CREATE UNIQUE INDEX ix_8bd6bca7 ON public.release_ USING btree (servletcontextname);

-- Drop table

-- DROP TABLE public.repository

CREATE TABLE public.repository (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	repositoryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	name varchar(200) NULL,
	description text NULL,
	portletid varchar(200) NULL,
	typesettings text NULL,
	dlfolderid int8 NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT repository_pkey PRIMARY KEY (repositoryid)
);
CREATE UNIQUE INDEX ix_11641e26 ON public.repository USING btree (uuid_, groupid);
CREATE UNIQUE INDEX ix_60c8634c ON public.repository USING btree (groupid, name, portletid);
CREATE INDEX ix_f543ea4 ON public.repository USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.repositoryentry

CREATE TABLE public.repositoryentry (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	repositoryentryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	repositoryid int8 NULL,
	mappedid varchar(255) NULL,
	manualcheckinrequired bool NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT repositoryentry_pkey PRIMARY KEY (repositoryentryid)
);
CREATE UNIQUE INDEX ix_354aa664 ON public.repositoryentry USING btree (uuid_, groupid);
CREATE UNIQUE INDEX ix_9bdcf489 ON public.repositoryentry USING btree (repositoryid, mappedid);
CREATE INDEX ix_d3b9af62 ON public.repositoryentry USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.resourceaction

CREATE TABLE public.resourceaction (
	mvccversion int8 NOT NULL DEFAULT 0,
	resourceactionid int8 NOT NULL,
	name varchar(255) NULL,
	actionid varchar(75) NULL,
	bitwisevalue int8 NULL,
	CONSTRAINT resourceaction_pkey PRIMARY KEY (resourceactionid)
);
CREATE UNIQUE INDEX ix_edb9986e ON public.resourceaction USING btree (name, actionid);

-- Drop table

-- DROP TABLE public.resourceblock

CREATE TABLE public.resourceblock (
	mvccversion int8 NOT NULL DEFAULT 0,
	resourceblockid int8 NOT NULL,
	companyid int8 NULL,
	groupid int8 NULL,
	name varchar(75) NULL,
	permissionshash varchar(75) NULL,
	referencecount int8 NULL,
	CONSTRAINT resourceblock_pkey PRIMARY KEY (resourceblockid)
);
CREATE INDEX ix_2d4cc782 ON public.resourceblock USING btree (companyid, name);
CREATE UNIQUE INDEX ix_aeea209c ON public.resourceblock USING btree (companyid, groupid, name, permissionshash);

-- Drop table

-- DROP TABLE public.resourceblockpermission

CREATE TABLE public.resourceblockpermission (
	mvccversion int8 NOT NULL DEFAULT 0,
	resourceblockpermissionid int8 NOT NULL,
	companyid int8 NULL,
	resourceblockid int8 NULL,
	roleid int8 NULL,
	actionids int8 NULL,
	CONSTRAINT resourceblockpermission_pkey PRIMARY KEY (resourceblockpermissionid)
);
CREATE INDEX ix_20a2e3d9 ON public.resourceblockpermission USING btree (roleid);
CREATE UNIQUE INDEX ix_d63d20bb ON public.resourceblockpermission USING btree (resourceblockid, roleid);

-- Drop table

-- DROP TABLE public.resourcepermission

CREATE TABLE public.resourcepermission (
	mvccversion int8 NOT NULL DEFAULT 0,
	resourcepermissionid int8 NOT NULL,
	companyid int8 NULL,
	name varchar(255) NULL,
	"scope" int4 NULL,
	primkey varchar(255) NULL,
	primkeyid int8 NULL,
	roleid int8 NULL,
	ownerid int8 NULL,
	actionids int8 NULL,
	viewactionid bool NULL,
	CONSTRAINT resourcepermission_pkey PRIMARY KEY (resourcepermissionid)
);
CREATE INDEX ix_26284944 ON public.resourcepermission USING btree (companyid, primkey);
CREATE INDEX ix_49aec6f3 ON public.resourcepermission USING btree (companyid, name, scope, primkeyid, roleid, viewactionid);
CREATE UNIQUE INDEX ix_8d83d0ce ON public.resourcepermission USING btree (companyid, name, scope, primkey, roleid);
CREATE INDEX ix_a37a0588 ON public.resourcepermission USING btree (roleid);
CREATE INDEX ix_d5f1e2a2 ON public.resourcepermission USING btree (name);
CREATE INDEX ix_f4555981 ON public.resourcepermission USING btree (scope);
CREATE INDEX ix_f6bae86a ON public.resourcepermission USING btree (companyid, scope, primkey);

-- Drop table

-- DROP TABLE public.resourcetypepermission

CREATE TABLE public.resourcetypepermission (
	mvccversion int8 NOT NULL DEFAULT 0,
	resourcetypepermissionid int8 NOT NULL,
	companyid int8 NULL,
	groupid int8 NULL,
	name varchar(75) NULL,
	roleid int8 NULL,
	actionids int8 NULL,
	CONSTRAINT resourcetypepermission_pkey PRIMARY KEY (resourcetypepermissionid)
);
CREATE INDEX ix_7d81f66f ON public.resourcetypepermission USING btree (companyid, name, roleid);
CREATE INDEX ix_a82690e2 ON public.resourcetypepermission USING btree (roleid);
CREATE UNIQUE INDEX ix_ba497163 ON public.resourcetypepermission USING btree (companyid, groupid, name, roleid);

-- Drop table

-- DROP TABLE public.role_

CREATE TABLE public.role_ (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	roleid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	name varchar(75) NULL,
	title text NULL,
	description text NULL,
	type_ int4 NULL,
	subtype varchar(75) NULL,
	CONSTRAINT role__pkey PRIMARY KEY (roleid)
);
CREATE INDEX ix_5eb4e2fb ON public.role_ USING btree (subtype);
CREATE UNIQUE INDEX ix_a88e424e ON public.role_ USING btree (companyid, classnameid, classpk);
CREATE INDEX ix_b9ff6043 ON public.role_ USING btree (uuid_, companyid);
CREATE INDEX ix_cbe204 ON public.role_ USING btree (type_, subtype);
CREATE UNIQUE INDEX ix_ebc931b8 ON public.role_ USING btree (companyid, name);
CREATE INDEX ix_f3e1c6fc ON public.role_ USING btree (companyid, type_);
CREATE INDEX ix_f436ec8e ON public.role_ USING btree (name);

-- Drop table

-- DROP TABLE public.sapentry

CREATE TABLE public.sapentry (
	uuid_ varchar(75) NULL,
	sapentryid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	allowedservicesignatures text NULL,
	defaultsapentry bool NULL,
	enabled bool NULL,
	name varchar(75) NULL,
	title text NULL,
	CONSTRAINT sapentry_pkey PRIMARY KEY (sapentryid)
);
CREATE INDEX ix_6d669d6f ON public.sapentry USING btree (companyid, defaultsapentry);
CREATE INDEX ix_90740311 ON public.sapentry USING btree (companyid, name);
CREATE INDEX ix_aaaeba0a ON public.sapentry USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.servicecomponent

CREATE TABLE public.servicecomponent (
	mvccversion int8 NOT NULL DEFAULT 0,
	servicecomponentid int8 NOT NULL,
	buildnamespace varchar(75) NULL,
	buildnumber int8 NULL,
	builddate int8 NULL,
	data_ text NULL,
	CONSTRAINT servicecomponent_pkey PRIMARY KEY (servicecomponentid)
);
CREATE UNIQUE INDEX ix_4f0315b8 ON public.servicecomponent USING btree (buildnamespace, buildnumber);

-- Drop table

-- DROP TABLE public.sitefriendlyurl

CREATE TABLE public.sitefriendlyurl (
	uuid_ varchar(75) NULL,
	sitefriendlyurlid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	groupid int8 NULL,
	friendlyurl varchar(75) NULL,
	languageid varchar(75) NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT sitefriendlyurl_pkey PRIMARY KEY (sitefriendlyurlid)
);
CREATE UNIQUE INDEX ix_7a3b7a2c ON public.sitefriendlyurl USING btree (companyid, groupid, languageid);
CREATE UNIQUE INDEX ix_82d4aad9 ON public.sitefriendlyurl USING btree (uuid_, groupid);
CREATE INDEX ix_e6d46a97 ON public.sitefriendlyurl USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_ff899b2f ON public.sitefriendlyurl USING btree (companyid, friendlyurl);

-- Drop table

-- DROP TABLE public.sitenavigationmenu

CREATE TABLE public.sitenavigationmenu (
	uuid_ varchar(75) NULL,
	sitenavigationmenuid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name varchar(75) NULL,
	type_ int4 NULL,
	auto_ bool NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT sitenavigationmenu_pkey PRIMARY KEY (sitenavigationmenuid)
);
CREATE INDEX ix_1125400b ON public.sitenavigationmenu USING btree (groupid, type_);
CREATE INDEX ix_1d786176 ON public.sitenavigationmenu USING btree (groupid, auto_);
CREATE INDEX ix_606c7814 ON public.sitenavigationmenu USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_711bf396 ON public.sitenavigationmenu USING btree (uuid_, groupid);
CREATE INDEX ix_ecbadac9 ON public.sitenavigationmenu USING btree (groupid, name);

-- Drop table

-- DROP TABLE public.sitenavigationmenuitem

CREATE TABLE public.sitenavigationmenuitem (
	uuid_ varchar(75) NULL,
	sitenavigationmenuitemid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	sitenavigationmenuid int8 NULL,
	parentsitenavigationmenuitemid int8 NULL,
	name varchar(255) NULL,
	type_ varchar(75) NULL,
	typesettings text NULL,
	order_ int4 NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT sitenavigationmenuitem_pkey PRIMARY KEY (sitenavigationmenuitemid)
);
CREATE INDEX ix_2294c622 ON public.sitenavigationmenuitem USING btree (sitenavigationmenuid, parentsitenavigationmenuitemid);
CREATE UNIQUE INDEX ix_6fd3df09 ON public.sitenavigationmenuitem USING btree (uuid_, groupid);
CREATE INDEX ix_75495c39 ON public.sitenavigationmenuitem USING btree (parentsitenavigationmenuitemid);
CREATE INDEX ix_90d752c7 ON public.sitenavigationmenuitem USING btree (uuid_, companyid);
CREATE INDEX ix_9fa7003b ON public.sitenavigationmenuitem USING btree (sitenavigationmenuid, name);

-- Drop table

-- DROP TABLE public.socialactivity

CREATE TABLE public.socialactivity (
	activityid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	createdate int8 NULL,
	activitysetid int8 NULL,
	mirroractivityid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	parentclassnameid int8 NULL,
	parentclasspk int8 NULL,
	type_ int4 NULL,
	extradata text NULL,
	receiveruserid int8 NULL,
	CONSTRAINT socialactivity_pkey PRIMARY KEY (activityid)
);
CREATE INDEX ix_121ca3cb ON public.socialactivity USING btree (receiveruserid);
CREATE INDEX ix_1f00c374 ON public.socialactivity USING btree (mirroractivityid, classnameid, classpk);
CREATE INDEX ix_3504b8bc ON public.socialactivity USING btree (userid);
CREATE INDEX ix_64b1bc66 ON public.socialactivity USING btree (companyid);
CREATE UNIQUE INDEX ix_8f32dec9 ON public.socialactivity USING btree (groupid, userid, createdate, classnameid, classpk, type_, receiveruserid);
CREATE INDEX ix_d0e9029e ON public.socialactivity USING btree (classnameid, classpk, type_);
CREATE INDEX ix_f542e9bc ON public.socialactivity USING btree (activitysetid);
CREATE INDEX ix_fb604dc7 ON public.socialactivity USING btree (groupid, userid, classnameid, classpk, type_, receiveruserid);

-- Drop table

-- DROP TABLE public.socialactivityachievement

CREATE TABLE public.socialactivityachievement (
	activityachievementid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	createdate int8 NULL,
	name varchar(75) NULL,
	firstingroup bool NULL,
	CONSTRAINT socialactivityachievement_pkey PRIMARY KEY (activityachievementid)
);
CREATE INDEX ix_83e16f2f ON public.socialactivityachievement USING btree (groupid, firstingroup);
CREATE INDEX ix_8f6408f0 ON public.socialactivityachievement USING btree (groupid, name);
CREATE INDEX ix_aabc18e9 ON public.socialactivityachievement USING btree (groupid, userid, firstingroup);
CREATE UNIQUE INDEX ix_d4390caa ON public.socialactivityachievement USING btree (groupid, userid, name);

-- Drop table

-- DROP TABLE public.socialactivitycounter

CREATE TABLE public.socialactivitycounter (
	activitycounterid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	name varchar(75) NULL,
	ownertype int4 NULL,
	currentvalue int4 NULL,
	totalvalue int4 NULL,
	gracevalue int4 NULL,
	startperiod int4 NULL,
	endperiod int4 NULL,
	active_ bool NULL,
	CONSTRAINT socialactivitycounter_pkey PRIMARY KEY (activitycounterid)
);
CREATE UNIQUE INDEX ix_1b7e3b67 ON public.socialactivitycounter USING btree (groupid, classnameid, classpk, name, ownertype, endperiod);
CREATE UNIQUE INDEX ix_374b35ae ON public.socialactivitycounter USING btree (groupid, classnameid, classpk, name, ownertype, startperiod);
CREATE INDEX ix_926cdd04 ON public.socialactivitycounter USING btree (groupid, classnameid, classpk, ownertype);
CREATE INDEX ix_a4b9a23b ON public.socialactivitycounter USING btree (classnameid, classpk);

-- Drop table

-- DROP TABLE public.socialactivitylimit

CREATE TABLE public.socialactivitylimit (
	activitylimitid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	activitytype int4 NULL,
	activitycountername varchar(75) NULL,
	value varchar(75) NULL,
	CONSTRAINT socialactivitylimit_pkey PRIMARY KEY (activitylimitid)
);
CREATE INDEX ix_6f9ede9f ON public.socialactivitylimit USING btree (userid);
CREATE INDEX ix_b15863fa ON public.socialactivitylimit USING btree (classnameid, classpk);
CREATE UNIQUE INDEX ix_f1c1a617 ON public.socialactivitylimit USING btree (groupid, userid, classnameid, classpk, activitytype, activitycountername);

-- Drop table

-- DROP TABLE public.socialactivityset

CREATE TABLE public.socialactivityset (
	activitysetid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	createdate int8 NULL,
	modifieddate int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	type_ int4 NULL,
	extradata text NULL,
	activitycount int4 NULL,
	CONSTRAINT socialactivityset_pkey PRIMARY KEY (activitysetid)
);
CREATE INDEX ix_4460fa14 ON public.socialactivityset USING btree (classnameid, classpk, type_);
CREATE INDEX ix_62ac101a ON public.socialactivityset USING btree (userid, classnameid, classpk, type_);
CREATE INDEX ix_9be30ddf ON public.socialactivityset USING btree (groupid, userid, classnameid, type_);
CREATE INDEX ix_f71071bd ON public.socialactivityset USING btree (groupid, userid, type_);

-- Drop table

-- DROP TABLE public.socialactivitysetting

CREATE TABLE public.socialactivitysetting (
	activitysettingid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	classnameid int8 NULL,
	activitytype int4 NULL,
	name varchar(75) NULL,
	value varchar(1024) NULL,
	CONSTRAINT socialactivitysetting_pkey PRIMARY KEY (activitysettingid)
);
CREATE INDEX ix_384788cd ON public.socialactivitysetting USING btree (groupid, activitytype);
CREATE INDEX ix_d984aaba ON public.socialactivitysetting USING btree (groupid, classnameid, activitytype, name);

-- Drop table

-- DROP TABLE public.socialrelation

CREATE TABLE public.socialrelation (
	uuid_ varchar(75) NULL,
	relationid int8 NOT NULL,
	companyid int8 NULL,
	createdate int8 NULL,
	userid1 int8 NULL,
	userid2 int8 NULL,
	type_ int4 NULL,
	CONSTRAINT socialrelation_pkey PRIMARY KEY (relationid)
);
CREATE UNIQUE INDEX ix_12a92145 ON public.socialrelation USING btree (userid1, userid2, type_);
CREATE INDEX ix_3f9c2fa8 ON public.socialrelation USING btree (userid2, type_);
CREATE INDEX ix_4b52be89 ON public.socialrelation USING btree (userid1, type_);
CREATE INDEX ix_5b30f663 ON public.socialrelation USING btree (uuid_, companyid);
CREATE INDEX ix_95135d1c ON public.socialrelation USING btree (companyid, type_);
CREATE INDEX ix_c31a64c6 ON public.socialrelation USING btree (type_);

-- Drop table

-- DROP TABLE public.socialrequest

CREATE TABLE public.socialrequest (
	uuid_ varchar(75) NULL,
	requestid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	createdate int8 NULL,
	modifieddate int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	type_ int4 NULL,
	extradata text NULL,
	receiveruserid int8 NULL,
	status int4 NULL,
	CONSTRAINT socialrequest_pkey PRIMARY KEY (requestid)
);
CREATE UNIQUE INDEX ix_36a90ca7 ON public.socialrequest USING btree (userid, classnameid, classpk, type_, receiveruserid);
CREATE UNIQUE INDEX ix_4f973efe ON public.socialrequest USING btree (uuid_, groupid);
CREATE INDEX ix_8d42897c ON public.socialrequest USING btree (uuid_, companyid);
CREATE INDEX ix_a90fe5a0 ON public.socialrequest USING btree (companyid);
CREATE INDEX ix_ab5906a8 ON public.socialrequest USING btree (userid, status);
CREATE INDEX ix_cc86a444 ON public.socialrequest USING btree (userid, classnameid, classpk, type_, status);
CREATE INDEX ix_d3425487 ON public.socialrequest USING btree (classnameid, classpk, type_, receiveruserid, status);
CREATE INDEX ix_d9380cb7 ON public.socialrequest USING btree (receiveruserid, status);

-- Drop table

-- DROP TABLE public."subscription"

CREATE TABLE public."subscription" (
	mvccversion int8 NOT NULL DEFAULT 0,
	subscriptionid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	frequency varchar(75) NULL,
	CONSTRAINT subscription_pkey PRIMARY KEY (subscriptionid)
);
CREATE INDEX ix_1290b81 ON public.subscription USING btree (groupid, userid);
CREATE UNIQUE INDEX ix_2e1a92d4 ON public.subscription USING btree (companyid, userid, classnameid, classpk);
CREATE INDEX ix_786d171a ON public.subscription USING btree (companyid, classnameid, classpk);
CREATE INDEX ix_e8f34171 ON public.subscription USING btree (userid, classnameid);

-- Drop table

-- DROP TABLE public.systemevent

CREATE TABLE public.systemevent (
	mvccversion int8 NOT NULL DEFAULT 0,
	systemeventid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	classuuid varchar(75) NULL,
	referrerclassnameid int8 NULL,
	parentsystemeventid int8 NULL,
	systemeventsetkey int8 NULL,
	type_ int4 NULL,
	extradata text NULL,
	CONSTRAINT systemevent_pkey PRIMARY KEY (systemeventid)
);
CREATE INDEX ix_a19c89ff ON public.systemevent USING btree (groupid, systemeventsetkey);
CREATE INDEX ix_ffcbb747 ON public.systemevent USING btree (groupid, classnameid, classpk, type_);

-- Drop table

-- DROP TABLE public.team

CREATE TABLE public.team (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	teamid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	groupid int8 NULL,
	name varchar(75) NULL,
	description text NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT team_pkey PRIMARY KEY (teamid)
);
CREATE UNIQUE INDEX ix_143dc786 ON public.team USING btree (groupid, name);
CREATE UNIQUE INDEX ix_39f69e79 ON public.team USING btree (uuid_, groupid);
CREATE INDEX ix_5d47f637 ON public.team USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.ticket

CREATE TABLE public.ticket (
	mvccversion int8 NOT NULL DEFAULT 0,
	ticketid int8 NOT NULL,
	companyid int8 NULL,
	createdate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	key_ varchar(75) NULL,
	type_ int4 NULL,
	extrainfo text NULL,
	expirationdate timestamp NULL,
	CONSTRAINT ticket_pkey PRIMARY KEY (ticketid)
);
CREATE INDEX ix_1e8dfb2e ON public.ticket USING btree (classnameid, classpk, type_);
CREATE INDEX ix_8bacd0aa ON public.ticket USING btree (companyid, classnameid, classpk, type_);
CREATE INDEX ix_b2468446 ON public.ticket USING btree (key_);

-- Drop table

-- DROP TABLE public.trashentry

CREATE TABLE public.trashentry (
	entryid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	systemeventsetkey int8 NULL,
	typesettings text NULL,
	status int4 NULL,
	CONSTRAINT trashentry_pkey PRIMARY KEY (entryid)
);
CREATE INDEX ix_2674f2a8 ON public.trashentry USING btree (companyid);
CREATE INDEX ix_6caae2e8 ON public.trashentry USING btree (groupid, createdate);
CREATE UNIQUE INDEX ix_b35f73d5 ON public.trashentry USING btree (classnameid, classpk);
CREATE INDEX ix_fc4eea64 ON public.trashentry USING btree (groupid, classnameid);

-- Drop table

-- DROP TABLE public.trashversion

CREATE TABLE public.trashversion (
	versionid int8 NOT NULL,
	companyid int8 NULL,
	entryid int8 NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	typesettings text NULL,
	status int4 NULL,
	CONSTRAINT trashversion_pkey PRIMARY KEY (versionid)
);
CREATE UNIQUE INDEX ix_630a643b ON public.trashversion USING btree (classnameid, classpk);
CREATE INDEX ix_72d58d37 ON public.trashversion USING btree (entryid, classnameid);

-- Drop table

-- DROP TABLE public.user_

CREATE TABLE public.user_ (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	externalreferencecode varchar(75) NULL,
	userid int8 NOT NULL,
	companyid int8 NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	defaultuser bool NULL,
	contactid int8 NULL,
	password_ varchar(75) NULL,
	passwordencrypted bool NULL,
	passwordreset bool NULL,
	passwordmodifieddate timestamp NULL,
	digest varchar(255) NULL,
	reminderqueryquestion varchar(75) NULL,
	reminderqueryanswer varchar(75) NULL,
	gracelogincount int4 NULL,
	screenname varchar(75) NULL,
	emailaddress varchar(254) NULL,
	facebookid int8 NULL,
	googleuserid varchar(75) NULL,
	ldapserverid int8 NULL,
	openid varchar(1024) NULL,
	portraitid int8 NULL,
	languageid varchar(75) NULL,
	timezoneid varchar(75) NULL,
	greeting varchar(255) NULL,
	"comments" text NULL,
	firstname varchar(75) NULL,
	middlename varchar(75) NULL,
	lastname varchar(75) NULL,
	jobtitle varchar(100) NULL,
	logindate timestamp NULL,
	loginip varchar(75) NULL,
	lastlogindate timestamp NULL,
	lastloginip varchar(75) NULL,
	lastfailedlogindate timestamp NULL,
	failedloginattempts int4 NULL,
	lockout bool NULL,
	lockoutdate timestamp NULL,
	agreedtotermsofuse bool NULL,
	emailaddressverified bool NULL,
	status int4 NULL,
	CONSTRAINT user__pkey PRIMARY KEY (userid)
);
CREATE INDEX ix_1d731f03 ON public.user_ USING btree (companyid, facebookid);
CREATE INDEX ix_405cc0e ON public.user_ USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_5adbe171 ON public.user_ USING btree (contactid);
CREATE UNIQUE INDEX ix_615e9f7a ON public.user_ USING btree (companyid, emailaddress);
CREATE INDEX ix_762f63c6 ON public.user_ USING btree (emailaddress);
CREATE INDEX ix_89509087 ON public.user_ USING btree (companyid, openid);
CREATE UNIQUE INDEX ix_9782ad88 ON public.user_ USING btree (companyid, userid);
CREATE INDEX ix_a18034a4 ON public.user_ USING btree (portraitid);
CREATE INDEX ix_b6e3ae1 ON public.user_ USING btree (companyid, googleuserid);
CREATE INDEX ix_bcfda257 ON public.user_ USING btree (companyid, createdate, modifieddate);
CREATE UNIQUE INDEX ix_c5806019 ON public.user_ USING btree (companyid, screenname);
CREATE INDEX ix_c6ea4f34 ON public.user_ USING btree (companyid, defaultuser, status);
CREATE INDEX ix_e1d3922f ON public.user_ USING btree (companyid, externalreferencecode);
CREATE INDEX ix_ee8abd19 ON public.user_ USING btree (companyid, modifieddate);
CREATE INDEX ix_f6039434 ON public.user_ USING btree (companyid, status);

-- Drop table

-- DROP TABLE public.usergroup

CREATE TABLE public.usergroup (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	externalreferencecode varchar(75) NULL,
	usergroupid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	parentusergroupid int8 NULL,
	name varchar(75) NULL,
	description text NULL,
	addedbyldapimport bool NULL,
	CONSTRAINT usergroup_pkey PRIMARY KEY (usergroupid)
);
CREATE UNIQUE INDEX ix_23ead0d ON public.usergroup USING btree (companyid, name);
CREATE INDEX ix_69771487 ON public.usergroup USING btree (companyid, parentusergroupid);
CREATE INDEX ix_72394f8e ON public.usergroup USING btree (uuid_, companyid);
CREATE INDEX ix_cb9015af ON public.usergroup USING btree (companyid, externalreferencecode);

-- Drop table

-- DROP TABLE public.usergroupgrouprole

CREATE TABLE public.usergroupgrouprole (
	mvccversion int8 NOT NULL DEFAULT 0,
	usergroupid int8 NOT NULL,
	groupid int8 NOT NULL,
	roleid int8 NOT NULL,
	companyid int8 NULL,
	CONSTRAINT usergroupgrouprole_pkey PRIMARY KEY (usergroupid, groupid, roleid)
);
CREATE INDEX ix_1cdf88c ON public.usergroupgrouprole USING btree (roleid);
CREATE INDEX ix_73c52252 ON public.usergroupgrouprole USING btree (usergroupid, groupid);
CREATE INDEX ix_cab0ccc8 ON public.usergroupgrouprole USING btree (groupid, roleid);

-- Drop table

-- DROP TABLE public.usergrouprole

CREATE TABLE public.usergrouprole (
	mvccversion int8 NOT NULL DEFAULT 0,
	userid int8 NOT NULL,
	groupid int8 NOT NULL,
	roleid int8 NOT NULL,
	companyid int8 NULL,
	CONSTRAINT usergrouprole_pkey PRIMARY KEY (userid, groupid, roleid)
);
CREATE INDEX ix_4d040680 ON public.usergrouprole USING btree (userid, groupid);
CREATE INDEX ix_871412df ON public.usergrouprole USING btree (groupid, roleid);
CREATE INDEX ix_887a2c95 ON public.usergrouprole USING btree (roleid);

-- Drop table

-- DROP TABLE public.usergroups_teams

CREATE TABLE public.usergroups_teams (
	companyid int8 NOT NULL,
	teamid int8 NOT NULL,
	usergroupid int8 NOT NULL,
	CONSTRAINT usergroups_teams_pkey PRIMARY KEY (teamid, usergroupid)
);
CREATE INDEX ix_2ac5356c ON public.usergroups_teams USING btree (companyid);
CREATE INDEX ix_31fb0b08 ON public.usergroups_teams USING btree (teamid);
CREATE INDEX ix_7f187e63 ON public.usergroups_teams USING btree (usergroupid);

-- Drop table

-- DROP TABLE public.useridmapper

CREATE TABLE public.useridmapper (
	mvccversion int8 NOT NULL DEFAULT 0,
	useridmapperid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	type_ varchar(75) NULL,
	description varchar(75) NULL,
	externaluserid varchar(75) NULL,
	CONSTRAINT useridmapper_pkey PRIMARY KEY (useridmapperid)
);
CREATE UNIQUE INDEX ix_41a32e0d ON public.useridmapper USING btree (type_, externaluserid);
CREATE UNIQUE INDEX ix_d1c44a6e ON public.useridmapper USING btree (userid, type_);

-- Drop table

-- DROP TABLE public.usernotificationdelivery

CREATE TABLE public.usernotificationdelivery (
	mvccversion int8 NOT NULL DEFAULT 0,
	usernotificationdeliveryid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	portletid varchar(200) NULL,
	classnameid int8 NULL,
	notificationtype int4 NULL,
	deliverytype int4 NULL,
	deliver bool NULL,
	CONSTRAINT usernotificationdelivery_pkey PRIMARY KEY (usernotificationdeliveryid)
);
CREATE UNIQUE INDEX ix_8b6e3ace ON public.usernotificationdelivery USING btree (userid, portletid, classnameid, notificationtype, deliverytype);

-- Drop table

-- DROP TABLE public.usernotificationevent

CREATE TABLE public.usernotificationevent (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	usernotificationeventid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	type_ varchar(200) NULL,
	"timestamp" int8 NULL,
	deliverytype int4 NULL,
	deliverby int8 NULL,
	delivered bool NULL,
	payload text NULL,
	actionrequired bool NULL,
	archived bool NULL,
	CONSTRAINT usernotificationevent_pkey PRIMARY KEY (usernotificationeventid)
);
CREATE INDEX ix_3dbb361a ON public.usernotificationevent USING btree (userid, archived);
CREATE INDEX ix_5ce95f03 ON public.usernotificationevent USING btree (userid, actionrequired, archived);
CREATE INDEX ix_8fb65ec1 ON public.usernotificationevent USING btree (userid, type_, deliverytype, delivered);
CREATE INDEX ix_a6bafdfe ON public.usernotificationevent USING btree (uuid_, companyid);
CREATE INDEX ix_a6f83617 ON public.usernotificationevent USING btree (userid, deliverytype, delivered, actionrequired);
CREATE INDEX ix_a87a585c ON public.usernotificationevent USING btree (userid, deliverytype, archived);
CREATE INDEX ix_bf29100b ON public.usernotificationevent USING btree (type_);
CREATE INDEX ix_c4efbd45 ON public.usernotificationevent USING btree (userid, deliverytype, actionrequired, archived);
CREATE INDEX ix_e32cc19 ON public.usernotificationevent USING btree (userid, delivered, actionrequired);

-- Drop table

-- DROP TABLE public.users_groups

CREATE TABLE public.users_groups (
	companyid int8 NOT NULL,
	groupid int8 NOT NULL,
	userid int8 NOT NULL,
	CONSTRAINT users_groups_pkey PRIMARY KEY (groupid, userid)
);
CREATE INDEX ix_3499b657 ON public.users_groups USING btree (companyid);
CREATE INDEX ix_c4f9e699 ON public.users_groups USING btree (groupid);
CREATE INDEX ix_f10b6c6b ON public.users_groups USING btree (userid);

-- Drop table

-- DROP TABLE public.users_orgs

CREATE TABLE public.users_orgs (
	companyid int8 NOT NULL,
	organizationid int8 NOT NULL,
	userid int8 NOT NULL,
	CONSTRAINT users_orgs_pkey PRIMARY KEY (organizationid, userid)
);
CREATE INDEX ix_5fbb883c ON public.users_orgs USING btree (companyid);
CREATE INDEX ix_7ef4ec0e ON public.users_orgs USING btree (organizationid);
CREATE INDEX ix_fb646ca6 ON public.users_orgs USING btree (userid);

-- Drop table

-- DROP TABLE public.users_roles

CREATE TABLE public.users_roles (
	companyid int8 NOT NULL,
	roleid int8 NOT NULL,
	userid int8 NOT NULL,
	CONSTRAINT users_roles_pkey PRIMARY KEY (roleid, userid)
);
CREATE INDEX ix_c19e5f31 ON public.users_roles USING btree (roleid);
CREATE INDEX ix_c1a01806 ON public.users_roles USING btree (userid);
CREATE INDEX ix_f987a0dc ON public.users_roles USING btree (companyid);

-- Drop table

-- DROP TABLE public.users_teams

CREATE TABLE public.users_teams (
	companyid int8 NOT NULL,
	teamid int8 NOT NULL,
	userid int8 NOT NULL,
	CONSTRAINT users_teams_pkey PRIMARY KEY (teamid, userid)
);
CREATE INDEX ix_4d06ad51 ON public.users_teams USING btree (teamid);
CREATE INDEX ix_799f8283 ON public.users_teams USING btree (companyid);
CREATE INDEX ix_a098efbf ON public.users_teams USING btree (userid);

-- Drop table

-- DROP TABLE public.users_usergroups

CREATE TABLE public.users_usergroups (
	companyid int8 NOT NULL,
	userid int8 NOT NULL,
	usergroupid int8 NOT NULL,
	CONSTRAINT users_usergroups_pkey PRIMARY KEY (userid, usergroupid)
);
CREATE INDEX ix_66ff2503 ON public.users_usergroups USING btree (usergroupid);
CREATE INDEX ix_bb65040c ON public.users_usergroups USING btree (companyid);
CREATE INDEX ix_be8102d6 ON public.users_usergroups USING btree (userid);

-- Drop table

-- DROP TABLE public.usertracker

CREATE TABLE public.usertracker (
	mvccversion int8 NOT NULL DEFAULT 0,
	usertrackerid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	modifieddate timestamp NULL,
	sessionid varchar(200) NULL,
	remoteaddr varchar(75) NULL,
	remotehost varchar(75) NULL,
	useragent varchar(200) NULL,
	CONSTRAINT usertracker_pkey PRIMARY KEY (usertrackerid)
);
CREATE INDEX ix_29ba1cf5 ON public.usertracker USING btree (companyid);
CREATE INDEX ix_46b0ae8e ON public.usertracker USING btree (sessionid);
CREATE INDEX ix_e4efba8d ON public.usertracker USING btree (userid);

-- Drop table

-- DROP TABLE public.usertrackerpath

CREATE TABLE public.usertrackerpath (
	mvccversion int8 NOT NULL DEFAULT 0,
	usertrackerpathid int8 NOT NULL,
	companyid int8 NULL,
	usertrackerid int8 NULL,
	path_ text NULL,
	pathdate timestamp NULL,
	CONSTRAINT usertrackerpath_pkey PRIMARY KEY (usertrackerpathid)
);
CREATE INDEX ix_14d8bcc0 ON public.usertrackerpath USING btree (usertrackerid);

-- Drop table

-- DROP TABLE public.virtualhost

CREATE TABLE public.virtualhost (
	mvccversion int8 NOT NULL DEFAULT 0,
	virtualhostid int8 NOT NULL,
	companyid int8 NULL,
	layoutsetid int8 NULL,
	hostname varchar(200) NULL,
	CONSTRAINT virtualhost_pkey PRIMARY KEY (virtualhostid)
);
CREATE UNIQUE INDEX ix_431a3960 ON public.virtualhost USING btree (hostname);
CREATE UNIQUE INDEX ix_a083d394 ON public.virtualhost USING btree (companyid, layoutsetid);

-- Drop table

-- DROP TABLE public.webdavprops

CREATE TABLE public.webdavprops (
	mvccversion int8 NOT NULL DEFAULT 0,
	webdavpropsid int8 NOT NULL,
	companyid int8 NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	props text NULL,
	CONSTRAINT webdavprops_pkey PRIMARY KEY (webdavpropsid)
);
CREATE UNIQUE INDEX ix_97dfa146 ON public.webdavprops USING btree (classnameid, classpk);

-- Drop table

-- DROP TABLE public.website

CREATE TABLE public.website (
	mvccversion int8 NOT NULL DEFAULT 0,
	uuid_ varchar(75) NULL,
	websiteid int8 NOT NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	url text NULL,
	typeid int8 NULL,
	primary_ bool NULL,
	lastpublishdate timestamp NULL,
	CONSTRAINT website_pkey PRIMARY KEY (websiteid)
);
CREATE INDEX ix_1aa07a6d ON public.website USING btree (companyid, classnameid, classpk, primary_);
CREATE INDEX ix_712bcd35 ON public.website USING btree (uuid_, companyid);
CREATE INDEX ix_f75690bb ON public.website USING btree (userid);

-- Drop table

-- DROP TABLE public.wikinode

CREATE TABLE public.wikinode (
	uuid_ varchar(75) NULL,
	nodeid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	name varchar(75) NULL,
	description text NULL,
	lastpostdate timestamp NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT wikinode_pkey PRIMARY KEY (nodeid)
);
CREATE INDEX ix_23325358 ON public.wikinode USING btree (groupid, status);
CREATE UNIQUE INDEX ix_7609b2ae ON public.wikinode USING btree (uuid_, groupid);
CREATE UNIQUE INDEX ix_920cd8b1 ON public.wikinode USING btree (groupid, name);
CREATE INDEX ix_b54332d6 ON public.wikinode USING btree (companyid, status);
CREATE INDEX ix_e0e6d12c ON public.wikinode USING btree (uuid_, companyid);

-- Drop table

-- DROP TABLE public.wikipage

CREATE TABLE public.wikipage (
	uuid_ varchar(75) NULL,
	pageid int8 NOT NULL,
	resourceprimkey int8 NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	nodeid int8 NULL,
	title varchar(255) NULL,
	"version" float8 NULL,
	minoredit bool NULL,
	"content" text NULL,
	summary text NULL,
	format varchar(75) NULL,
	head bool NULL,
	parenttitle varchar(255) NULL,
	redirecttitle varchar(255) NULL,
	lastpublishdate timestamp NULL,
	status int4 NULL,
	statusbyuserid int8 NULL,
	statusbyusername varchar(75) NULL,
	statusdate timestamp NULL,
	CONSTRAINT wikipage_pkey PRIMARY KEY (pageid)
);
CREATE INDEX ix_1725355c ON public.wikipage USING btree (resourceprimkey, status);
CREATE INDEX ix_1ecc7656 ON public.wikipage USING btree (nodeid, redirecttitle);
CREATE UNIQUE INDEX ix_2cd67c81 ON public.wikipage USING btree (resourceprimkey, nodeid, version);
CREATE UNIQUE INDEX ix_3d4af476 ON public.wikipage USING btree (nodeid, title, version);
CREATE INDEX ix_40f94f68 ON public.wikipage USING btree (nodeid, head, redirecttitle, status);
CREATE INDEX ix_432f0ab0 ON public.wikipage USING btree (nodeid, head, status);
CREATE INDEX ix_46eef3c8 ON public.wikipage USING btree (nodeid, parenttitle);
CREATE INDEX ix_546f2d5c ON public.wikipage USING btree (nodeid, status);
CREATE INDEX ix_5dc4bd39 ON public.wikipage USING btree (uuid_, companyid);
CREATE INDEX ix_5ff21ce6 ON public.wikipage USING btree (groupid, nodeid, title, head);
CREATE UNIQUE INDEX ix_899d3dfb ON public.wikipage USING btree (uuid_, groupid);
CREATE INDEX ix_941e429c ON public.wikipage USING btree (groupid, nodeid, status);
CREATE INDEX ix_94d1054d ON public.wikipage USING btree (resourceprimkey, nodeid, status);
CREATE INDEX ix_9f7655da ON public.wikipage USING btree (nodeid, head, parenttitle, status);
CREATE INDEX ix_a2001730 ON public.wikipage USING btree (format);
CREATE INDEX ix_ba72b89a ON public.wikipage USING btree (groupid, nodeid, head, parenttitle, status);
CREATE INDEX ix_bea33ab8 ON public.wikipage USING btree (nodeid, title, status);
CREATE INDEX ix_caa451d6 ON public.wikipage USING btree (groupid, userid, nodeid, status);
CREATE INDEX ix_e0092ff0 ON public.wikipage USING btree (groupid, nodeid, head, status);
CREATE INDEX ix_e1f55fb ON public.wikipage USING btree (resourceprimkey, nodeid, head);
CREATE INDEX ix_e745ea26 ON public.wikipage USING btree (nodeid, title, head);
CREATE INDEX ix_fbbe7c96 ON public.wikipage USING btree (userid, nodeid, status);

-- Drop table

-- DROP TABLE public.wikipageresource

CREATE TABLE public.wikipageresource (
	uuid_ varchar(75) NULL,
	resourceprimkey int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	nodeid int8 NULL,
	title varchar(255) NULL,
	CONSTRAINT wikipageresource_pkey PRIMARY KEY (resourceprimkey)
);
CREATE INDEX ix_13319367 ON public.wikipageresource USING btree (uuid_, companyid);
CREATE UNIQUE INDEX ix_21277664 ON public.wikipageresource USING btree (nodeid, title);
CREATE UNIQUE INDEX ix_f705c7a9 ON public.wikipageresource USING btree (uuid_, groupid);

-- Drop table

-- DROP TABLE public.workflowdefinitionlink

CREATE TABLE public.workflowdefinitionlink (
	mvccversion int8 NOT NULL DEFAULT 0,
	workflowdefinitionlinkid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	typepk int8 NULL,
	workflowdefinitionname varchar(75) NULL,
	workflowdefinitionversion int4 NULL,
	CONSTRAINT workflowdefinitionlink_pkey PRIMARY KEY (workflowdefinitionlinkid)
);
CREATE INDEX ix_705b40ee ON public.workflowdefinitionlink USING btree (groupid, companyid, classnameid, classpk, typepk);
CREATE INDEX ix_a4db1f0f ON public.workflowdefinitionlink USING btree (companyid, workflowdefinitionname, workflowdefinitionversion);

-- Drop table

-- DROP TABLE public.workflowinstancelink

CREATE TABLE public.workflowinstancelink (
	mvccversion int8 NOT NULL DEFAULT 0,
	workflowinstancelinkid int8 NOT NULL,
	groupid int8 NULL,
	companyid int8 NULL,
	userid int8 NULL,
	username varchar(75) NULL,
	createdate timestamp NULL,
	modifieddate timestamp NULL,
	classnameid int8 NULL,
	classpk int8 NULL,
	workflowinstanceid int8 NULL,
	CONSTRAINT workflowinstancelink_pkey PRIMARY KEY (workflowinstancelinkid)
);
CREATE INDEX ix_415a7007 ON public.workflowinstancelink USING btree (groupid, companyid, classnameid, classpk);
