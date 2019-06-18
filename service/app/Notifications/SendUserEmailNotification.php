<?php

namespace App\Notifications;

use App\Channels\FirebaseEmailChannel;
use Illuminate\Notifications\Notification;

class SendUserEmailNotification extends Notification
{
    /**
     * The temporary password.
     *
     * @var string
     */
    public $subject;

    public $message;

    /**
     * Create a notification instance.
     *
     * @param string $password
     * @param string $token
     * @return void
     */
    public function __construct($payload)
    {
        $this->subject = $payload['subject'];
        $this->message = $payload['message'];
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
            '_state' => config('queue.connections.firebase.queue.states.send_user_notification_email'),
            'data' => [
                'name' => $profile->first_name . ' ' . $profile->last_name,
                'email' => $notifiable->email,
                'message' => $this->message,
                'subject' => $this->subject
            ],
        ];

        if ($channel->isEnabled()) {
            $channel->push($data, true);
        }
    }
}
