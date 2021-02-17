# Bolo Wizard

Spain's music events.

## API's used

- Ticketmaster
- Google maps

## Routes

| Route  | Http verb | Description |
| ------------- | ------------- | ------------- |
| /  | GET  | Index and city selection  |
| /  | POST  | Send city data  |
| /events/:city  | GET  | Events list  |
| /events/detalles/:_id  | GET  | See details of the event and map location  |
| /auth/signup  | GET  | Register as a local artist  |
| /auth/signup  | POST  | Send registration request to database  |
| /auth/login  | GET  | User log in  |
| /auth/login  | POST  | User log in  |
| /profile  | GET  | See profile and add events  |
| /profile  | POST  | Send event data to the database  |
| /profile/edit  | GET  | Edit profile form  |
| /profile/edit  | POST  | Edit profile form  |
| /adminpage  | GET  | Admin page to see registration requests  |
| /adminpage  | GET  | Admin page to approve or decline registration requests  |




