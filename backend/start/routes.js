'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('register', 'Auth/RegisterController.register')
Route.post('login', 'Auth/LoginController.login')

Route.group('admin', () => {
  Route.get('/', 'Admin/DashboardController.index').as('index')

  Route.resource('roles', 'Admin/RoleController').apiOnly().only(['index', 'show'])
  Route.resource('users', 'Admin/UserController')
    .apiOnly()
    .validator(new Map([
      [['admin.users.store'], ['Admin/StoreUser']],
      [['admin.users.update'], ['Admin/UpdateUser']],
    ]))

  Route.resource('services', 'Admin/ServiceController')
    .apiOnly()
    .validator(new Map([
      [['admin.services.store'], ['Admin/StoreService']],
      [['admin.services.update'], ['Admin/UpdateService']],
    ]))

  Route.resource('schedules', 'Admin/ScheduleController')
    .apiOnly()
    .validator(new Map([
      [['admin.schedules.store'], ['Admin/StoreSchedule']],
      [['admin.schedules.update'], ['Admin/UpdateSchedule']],
    ]))
  Route.put('schedules/:id/status', 'Admin/ScheduleController.status').validator('Admin/UpdateStatusSchedule').as('schedules.status')
  Route.put('schedules/:id/services/:service_id/status', 'Admin/ScheduleController.serviceStatus').validator('Admin/UpdateServiceStatusSchedule').as('schedules.services.status')
}).prefix('admin').middleware(['auth:jwt', 'is:admin'])

Route.group('client', () => {
  Route.resource('services', 'Client/ServiceController').apiOnly().only(['index', 'show'])

  Route.resource('schedules', 'Client/ScheduleController')
    .apiOnly()
    .validator(new Map([
      [['client.schedules.store'], ['Client/StoreSchedule']],
      [['client.schedules.update'], ['Client/UpdateSchedule']],
    ]))
}).prefix('client').middleware(['auth:jwt', 'is:client'])
