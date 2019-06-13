<?php

namespace App\Modules\Service\Repositories;

use App\Modules\Service\Models\QuestionaireAnswer;
use Illuminate\Support\Facades\DB;

class QuestionaireAnswerRepository extends QuestionaireAnswer
{
    /**
     * scope create question answers
     * @param $data array
     * @return answers
     */
    public static function createAnswers($data, $transaction, $profile)
    {
        return DB::transaction(function() use($data, $transaction, $profile){
            foreach($data as $field => $value)
            {
                $questionaire = QuestionaireRepository::whereField($field)->firstOrFail();
                $ticket = $transaction->questionaireAnswers()->create([
                    'answer' => $value
                ]);
                $ticket->profile()->associate($profile)->save();
                $ticket->questionaire()->associate($questionaire)->save();
            }
            return $transaction->questionaireAnswers;
        });
        return false;
    }

    public static function updateAnswers($data, $transaction, $profile)
    {
        return DB::transaction(function() use($data, $transaction, $profile){
            foreach($data as $field => $value)
            {
                $questionaire = QuestionaireRepository::whereField($field)->firstOrFail();
                $ticket = $transaction->questionaireAnswers()
                    ->where('profile_site_user_id', $profile->id)
                    ->where('questionaire_id', $questionaire->id)
                    ->first();
                if($ticket)
                {
                    $ticket->update(['answer' => $value]);
                }
            }
            return $transaction->fresh()->questionaireAnswers;
        });
    }


}
