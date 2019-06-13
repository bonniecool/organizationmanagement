<?php

namespace App\Modules\User\Providers;

use Illuminate\Support\Facades\Validator;
use Caffeinated\Modules\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class ModuleServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the module services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__.'/../Resources/Lang', 'user');
        $this->loadViewsFrom(__DIR__.'/../Resources/Views', 'user');
        $this->loadMigrationsFrom(__DIR__.'/../Database/Migrations', 'user');
        $this->loadConfigsFrom(__DIR__.'/../config');

        Relation::morphMap([
            config('module_user.constants.user_types.superadmin') => \App\Modules\User\Repositories\SuperAdminRepository::class,
            config('module_user.constants.user_types.administrator') => \App\Modules\User\Repositories\AdministratorRepository::class,
            config('module_user.constants.user_types.branchadmin') => \App\Modules\User\Repositories\BranchAdministratorRepository::class,
        ]);

    }

    /**
     * Register the module services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(RouteServiceProvider::class);
    }
}
