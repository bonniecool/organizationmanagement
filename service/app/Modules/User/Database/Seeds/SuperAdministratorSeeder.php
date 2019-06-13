<?php

namespace App\Modules\User\Database\Seeds;

use App\Modules\User\Repositories\SuperAdminRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class SuperAdministratorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::reguard();
        if (SuperAdminRepository::first()) {
            return;
        }

        $data = [
            'email' => 'super@email.com',
            'password' => '123123123',
            'first_name' => 'Juan',
            'middle_name' => 'Ace',
            'last_name' => 'Dela Cruz',
            'mobile_number' => '09276543226'
        ];

        SuperAdminRepository::createProfile($data);
    }
}
