This document specifies the api paths.

## User
api/users/\
api/users/login/ => get cookie\
api/users/logout/ => destroy cookie\
api/users/register/\
api/users/delete/\
api/users/update/ => post new data\

## Sports Group
/api/sportsgroup/\
/api/sportsgroup/update/\
/api/sportsgroup/create/\
/api/sportsgroup/delete/\

## Sports Group guides
/api/sportsgroup/guides?user=id|group=id|department=id => returns list of users or groups\
/api/sportsgroup/guides/create?group=id&user=id\
/api/sportsgroup/guides/delete?group=id&user=id\

# Department
/api/department/\
/api/department/create/\
/api/department/update/\
/api/department/delete/\
/api/department/groups/\
/api/department/leads/create?user=id&department=id\
/api/department/leads/delete?user=id&department=id\
/api/department/leads/?department=id => returns list of all leaders of the department\

## Train hour
/api/trainhour?group=id&userlist=\[ids\]&data=date&starttime=string&endtime=string&place=string&note=string\
/api/trainhour/update?group=id&userlist=\[ids\]&data=date&starttime=string&endtime=string&place=string&note=string\
/api/trainhour/delete?group=id&userlist=\[ids\]&data=date&starttime=string&endtime=string&place=string&note=string\


