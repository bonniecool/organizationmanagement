<?php

namespace App\Modules\User\Database\Seeds;

use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Modules\User\Repositories\UserRepository;
use App\Modules\User\Repositories\SiteUserRepository;

class SiteUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::reguard();

        $faker = Factory::create('en_PH');

        $data = [
            [
                'email' => 'siteUser@email.com',
                'password' => '123123123',
                'first_name' => $faker->firstName,
                'middle_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => $faker->mobileNumber,
                'name' => "Multisys",
                
            ],
            [
                'email' => 'siteUser2@email.com',
                'password' => '123123123',
                'first_name' => $faker->firstName,
                'middle_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => $faker->mobileNumber,
                'name' => "Organization 2",
            ],
            [
                'email' => 'siteUser3@email.com',
                'password' => '123123123',
                'first_name' => $faker->firstName,
                'middle_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => $faker->mobileNumber,
                'name' => "Organization 3",
            ],
            [
                'email' => 'siteUser4@email.com',
                'password' => '123123123',
                'first_name' => $faker->firstName,
                'middle_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => $faker->mobileNumber,
                'name' => "Organization 4",
            ],
            [
                'email' => 'siteUser5@email.com',
                'password' => '123123123',
                'first_name' => $faker->firstName,
                'middle_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => $faker->mobileNumber,
                'name' => "Organization 5",
            ]
        ];
        foreach ($data as $userData) {
            $user = UserRepository::whereEmail($userData['email'])->first();
            if (!$user) {
                $user = SiteUserRepository::createProfile($userData);
                $user->activated_at = Carbon::now();
                $user->save();
            }
        }
    }
}
