<?php

namespace App\Modules\User\Database\Seeds;

use App\Modules\User\Repositories\UserRepository;
use Faker\Factory;
use App\Modules\User\Repositories\AdministratorRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class AdministratorDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::reguard();
        $users = self::getAdmin();
        foreach ($users as $user)
        {
            $admin = UserRepository::whereEmail($user['email'])->first();
            if (!$admin)
            {
                dump($user);
                AdministratorRepository::createProfile($user);
            }
        }


    }

    public function getAdmin()
    {
        $faker = Factory::create('en_PH');
        return [
            [
                'email' => 'admin1@email.com',
                'password' => '123123123',
                'first_name' => $faker->firstName,
                'middle_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => '09276543226'
            ],
            [
                'email' => 'admin2@email.com',
                'password' => '123123123',
                'first_name' => $faker->firstName,
                'middle_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => '09276543226'
            ],
            [
                'email' => 'admin3@email.com',
                'password' => '123123123',
                'first_name' => $faker->firstName,
                'middle_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => '09276543226'
            ],
            [
                'email' => 'admin4@email.com',
                'password' => '123123123',
                'first_name' => $faker->firstName,
                'middle_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => '09276543226'
            ],
            [
                'email' => 'admin5@email.com',
                'password' => '123123123',
                'first_name' => $faker->firstName,
                'middle_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => '09276543226'
            ],
            [

                'email' => 'admin6@email.com',
                'password' => '123123123',
                'first_name' => $faker->firstName,
                'middle_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => '09276543226'
            ],
        ];
    }
}
