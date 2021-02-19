# Bolo Wizard

Spain's music events.

## API's used

- Ticketmaster
- Google maps

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






