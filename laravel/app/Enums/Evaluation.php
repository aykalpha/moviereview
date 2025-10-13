<?php

namespace App\Enums;

enum Evaluation: string
{
    case VERY_BAD = "1";
    case BAD = "2";
    case NORMAL = "3";
    case GOOD = "4";
    case VERY_GOOD = "5";
}
