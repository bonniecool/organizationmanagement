<?php

namespace App\Channels;

use Kreait\Firebase\Factory;
use Illuminate\Support\Facades\Log;
use Kreait\Firebase\ServiceAccount;
use Illuminate\Notifications\Notification;
use Kreait\Firebase\Exception\ApiException;

class FirebaseEmailChannel
{

    protected $firebase;

    public function send($notifiable, Notification $notification)
    {
        $jsonConfig = storage_path(
            config('queue.connections.firebase.queue.config_path')
        );

        $serviceAccount = ServiceAccount::fromJsonFile($jsonConfig);

        $this->firebase = (new Factory)
            ->withServiceAccount($serviceAccount)
            ->create();
        $notification->toFirebaseMail($this, $notifiable);
    }

    public function push(array $data)
    {
        $database = $this->firebase->getDatabase();
        try {
            return $database
                ->getReference(config('queue.connections.firebase.queue.reference'))
                ->push($data);
        } catch (ApiException $e) {
            Log::log('error', $e);
        }
    }

    public function isEnabled()
    {
        return (config('queue.connections.firebase.queue.enable') === true)
            ? true
            : false
            ;
    }
}
