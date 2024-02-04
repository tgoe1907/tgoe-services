This is the documentation of authorizations in the TGÖ-services-backend application.

# Authorization levels
In this application we have 4 authorization levels.
Each level includes the rights of all underlying levels.
1. Member
2. Trainer
3. Department Manager
4. Administrator

We divide between 3 access modes. No access, reading access and writing access.
For all possible accesses that are not definded here, the default access is no access.

## Member
A member has write access to its own user name and email adress.
He has read access to its membership_number and the sportsgroup list and the names of the trainers of a group.

## Trainer
A trainer has all rights of a Member.
Additionally a trainer is related to one or more specific sport groups.
For this sport group, the trainer has write access to his own train hours and to the regular train units.
All trainers of a specific sport group have read access to the train hours of this group.

## Department Manager
A department manager is related to a specific department.
In this department, the manager has write access to all sport groups of the department.
They are not restricted to own train hours and can assign arbitrary trainers to arbitrary train hours.
Also, department managers can create and rename sport groups in there own department.
Department manager assign the trainer right to a member and remove it from a trainer.

## Administrator
An administrator has no limitations in his rights.
He has all rights of a department managers for all departments.
The administrator assign the department manager right to a member and can remove it.
The administrator can create new departments and can move one sport group from one department to another.
