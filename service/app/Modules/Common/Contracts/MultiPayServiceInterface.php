<?php

namespace App\Modules\Common\Contracts;

interface MultiPayServiceInterface
{
    public function generate(array $data);
}