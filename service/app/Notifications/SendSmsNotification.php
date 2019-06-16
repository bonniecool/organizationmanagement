<?php

namespace App\Notifications;

use App\Channels\FirebaseEmailChannel;
use Illuminate\Notifications\Notification;

class SendSmsNotification extends Notification
{
     /**
      * Create a notification instance.
      *
      * @param string $password
      * @param string $token
      * @return void
      */
     public function __construct($payload)
     {
         $this->posted_by = $payload['posted_by'];
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
        $data    = [
            '_state' => config('queue.connections.firebase.queue.states.send_sms'),
            'data' => [
                'subject' => $notifiable->subject,
                'content' => $notifiable->content,
                'posted_by' => $this->posted_by
            ],
        ];

        if ($channel->isEnabled()) {
            $channel->push($data, true);
        }
    }
}