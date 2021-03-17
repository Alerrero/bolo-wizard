# Bolo Wizard

Search music events in your city.

## Technologies

- Node.js
- Express.js
- MongoDB
- HBS

## API's used

- Ticketmaster
- Google maps
- Google places
- Spotify

## Features

- Search music events by city and filter by date using Ticketmaster API
- Search local events created by bands and music artists registered in our app
- Hear the artists music befored buying tickets or attending the concert with Spotify API
- See the music event location with the Google Maps API
- Admin page in which the admin can approve or dismiss new registered artists

## Site

- Landing page where you can search music events by city
![bolowizard](https://user-images.githubusercontent.com/75569696/111182835-99bcf280-85af-11eb-9632-875bad09595a.png)

- List of events page, where there is an additional date filter
![events-list](https://user-images.githubusercontent.com/75569696/111182723-7b56f700-85af-11eb-8db2-80d5a4f08021.png)

- Details of selected event
![event-details](https://user-images.githubusercontent.com/75569696/111182704-74c87f80-85af-11eb-922b-57254065836f.png)

## Routes

| Route  | Http verb | Description |
| ------------- | ------------- | ------------- |
| `/`  | GET  | City selection  |
| `/`  | POST  | Send city data  |
| `/eventos/:city`  | GET  | Events list bu city  |
| `eventor/:city`   | POST | Filter by month
| `/eventos/detalles/:_id`  | GET  | See details of the Ticketmaster event and map location  |
| `/eventos/locales-detalles/:_id`  | GET  | See details of the DB event and map location  |
| `/auth/registro`  | GET  | Render Sing up form  |
| `/auth/registro`  | POST  | Create user in DB  |
| `/auth/inicio`  | GET  | Render Log in form  |
| `/auth/inicio`  | POST  | Log user  |
| `/auth/cierre`  | GET  | Log out user |  
| `usuario/perfil`  | GET  | Render profile page & artist events  |
| `usuario/editar/:user_id`  | GET  | Render edit user profile form |
| `usuario/editar/:user_id`  | POST  | Edit profile |
| `usuario/mi-evento`  | GET  | Render create event form  |
| `usuario/mi-evento`  | POST  | Create event |
| `usuario/mi-evento/editar/:id`  | GET  | Render edit event form  |
| `usuario/mi-evento/editar/:id`  | POST  | Update event |
| `usuario/mi-evento/eliminar/:id`  | POST  | Delete event |
| `usuario/admin-page`  | GET  | Render admin event  |
| `usuario/admin-page/update/:id`  | POST  | Accept artist  |
| `usuario/admin-page/delete/:id`  | POST  | Delete artist  |
| `api/events`  | GET  | Events JSON  |






