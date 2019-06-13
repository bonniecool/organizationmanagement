<?php

namespace App\Notifications;

use App\Channels\FirebaseEmailChannel;
use Illuminate\Notifications\Notification;

class SendActivation extends Notification
{
    /**
     * The temporary password.
     *
     * @var string
     */
    public $token;

    /**
     * Create a notification instance.
     *
     * @param string $password
     * @param string $token
     * @return void
     */
    public function __construct($token)
    {
        $this->token    = $token;
    }

    /**
     * Get the notification's channels.
     *
     * @param  mixed  $notifiable
     * @return array|string
     */
    public function via($notifiable)
    {
        return [FirebaseEmailChannel::class];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return void
     */
    public function toFirebaseMail($channel, $notifiable)
    {
        $profile = $notifiable->profile;
        $data    = [
            '_state' => config('queue.connections.firebase.queue.states.account_activation'),
            'data' => [
                'name' => $profile->first_name . ' ' . $profile->last_name,
                'email' => $notifiable->email,
                'link' => url(config('app.front_end_url') . '/account/activate?token=' . $this->token),
            ],
        ];

        if ($channel->isEnabled()) {
            $channel->push($data, true);
        }
    }
}
