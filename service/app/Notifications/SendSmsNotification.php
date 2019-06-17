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
     public function __construct($member)
     {
         $this->mobile_number = $member->mobile_number;
         $this->member_id = $member->id;
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
                'mobile_number' => $this->mobile_number,
                'member_id' => $this->member_id,
                'reminder_id' => $notifiable->id,
                'subject' => $notifiable->subject,
                'content' => $notifiable->content,
                'posted_by' => $notifiable->creator->profile->full_name,
            ],
        ];

        if ($channel->isEnabled()) {
            $channel->push($data, true);
        }
    }
}