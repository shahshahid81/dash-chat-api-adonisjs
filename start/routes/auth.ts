import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.post('register', 'AuthController.register').as('register')
    Route.post('login', 'AuthController.login').as('login')
    Route.post('logout', 'AuthController.logout').as('logout').middleware('auth')
}).prefix('api/auth').as('api-auth')
