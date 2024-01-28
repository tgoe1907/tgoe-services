# Documentation to TGÖ Services Application
The overall goal of this project is to provide an application to manage the worked hours of the trainers of the TGÖ in the different groups.

This Project is split to two different applications.
The tgo-services-backend holds and processes the application data on server side.
tgo-services-fronted is an web application build up on Angular which provides an Interface to show and change this data.

## Backend
The backend provides a REST API to the data of the Application

### Data
This section describes the data, that is processed in this application.
A person is a unique natural person. For one user only one person exists.
A person has a sure and last name, a membership number and potentially multiple licences.
If a person decides to be a trainer, the person has to select a sports group and the position higher than Teilnehmer he executes in this sports group.
This is noted in the member relation. 
For all trainer also the membership number attribute in the person tabel is mandatory.
A sports group has a unique name and potentially multiple regular training hours.
A regular training hour takes place on a specific weekday to a specific time and at a specific place.
It is allowed to have multiple places at the same time and date because some groups train in the winter at different places than in the summer.
Trainings hours are a relation between a natural person and a sports group. 
To create an entry in this table, an entry for this person and sports group has to be present in the member table.
The training hour takes place at a specific date.
In the default case, the training is regular.
In this case, the data of the regular training hour regarding the weekday of in this relation is taken.
If it is not a regular training hour, the attributes time and place have to be filled manually.
There is also an optional field note for noting something important for the specific hour.
Also there is the optional list field of members where the participants of the course can be noted.


- person
    - full name
    - *membership number*
    - multiple *license*

- member
    - **person**
    - **sports group**
    - **position**

position:
    - Übungsleiter B
    - Übungsleiter C
    - Übungsleiter 
    - Übungsleiter Helfer
    - Teilnehmer

- sports group
    - full name
    - multiple **regular training hour**

- regular training hour
    - weekday
    - start time
    - end time
    - place

- training hours
    - **person**
    - **sports group**
    - date
    - regular/not regular training?
    - time
    - place
    - *note*
    - *multiple member*


