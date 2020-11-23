'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Service = use('App/Models/Service')

class ServiceSeeder {
  async run() {
    await Service.create({
      name: 'Corte masculino',
      price: 20.00,
    })

    await Service.create({
      name: 'Corte feminino',
      price: 50.00,
    })

    await Service.create({
      name: 'Corte infantil',
      price: 10.00,
    })

    await Service.create({
      name: 'Escova',
      price: 50.00,
    })

    await Service.create({
      name: 'Hidratação',
      price: 50.00,
    })

    await Service.create({
      name: 'Manicure e pedicure',
      price: 100.00,
    })

    await Service.create({
      name: 'Depilação',
      price: 200.00,
    })

    await Service.create({
      name: 'Maquiagem',
      price: 75.00,
    })

    await Service.create({
      name: 'Coloração',
      price: 100.00,
    })
  }
}

module.exports = ServiceSeeder
