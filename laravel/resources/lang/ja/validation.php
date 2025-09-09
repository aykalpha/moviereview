<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    */

    'accepted' => ':attributeを承認してください。',
    'accepted_if' => ':otherが:valueの場合、:attributeを承認する必要があります。',
    'active_url' => ':attributeは、有効なURLではありません。',
    'after' => ':attributeには、:dateより後の日付を指定してください。',
    'after_or_equal' => ':attributeには、:date以降の日付を指定してください。',
    'alpha' => ':attributeには、アルファベッドのみ使用できます。',
    'alpha_dash' => ':attributeには、英数字(\'A-Z\',\'a-z\',\'0-9\')とハイフンと下線(\'-\',\'_\')が使用できます。',
    'alpha_num' => ':attributeには、英数字(\'A-Z\',\'a-z\',\'0-9\')が使用できます。',
    'any_of' => ':attributeは、有効ではありません。',
    'array' => ':attributeには、配列を指定してください。',
    'ascii' => ':attributeには、英数字と記号のみ使用可能です。',
    'attached' => 'この:attributeはすでに添付されています。',
    'before' => ':attributeには、:dateより前の日付を指定してください。',
    'before_or_equal' => ':attributeには、:date以前の日付を指定してください。',
    'between' => [
        'array' => ':attributeの項目は、:min個から:max個にしてください。',
        'file' => ':attributeには、:min KBから:max KBまでのサイズのファイルを指定してください。',
        'numeric' => ':attributeには、:minから:maxまでの数字を指定してください。',
        'string' => ':attributeは、:min文字から:max文字にしてください。',
    ],
    'boolean' => ':attributeには、\'true\'か\'false\'を指定してください。',
    'can' => ':attributeに権限のない値が含まれています。',
    'confirmed' => ':attributeと:attribute確認が一致しません。',
    'contains' => ':attributeに必須項目が含まれていません。',
    'current_password' => 'パスワードが正しくありません。',
    'date' => ':attributeは、正しい日付ではありません。',
    'date_equals' => ':attributeは:dateと同じ日付を入力してください。',
    'date_format' => ':attributeの形式が\':format\'と一致しません。',
    'decimal' => ':attributeは、小数点以下が:decimalである必要があります。',
    'declined' => ':attributeを拒否する必要があります。',
    'declined_if' => ':otherが:valueの場合、:attributeを拒否する必要があります。',
    'different' => ':attributeと:otherには、異なるものを指定してください。',
    'digits' => ':attributeは、:digits桁にしてください。',
    'digits_between' => ':attributeは、:min桁から:max桁にしてください。',
    'dimensions' => ':attributeの画像サイズが無効です',
    'distinct' => ':attributeの値が重複しています。',
    'doesnt_contain' => ':attributeには以下の値を含めることはできません: :values',
    'doesnt_end_with' => ':attributeの終わりは「:values」以外である必要があります。',
    'doesnt_start_with' => ':attributeの始まりは「:values」以外である必要があります。',
    'email' => ':attributeは、有効なメールアドレス形式で指定してください。',
    'ends_with' => ':attributeの終わりは「:values」である必要があります。',
    'enum' => '選択した :attributeは無効です。',
    'exists' => '選択された:attributeは、有効ではありません。',
    'extensions' => ':attribute には、次のいずれかの拡張子が必要です: :values',
    'failed' => '認証に失敗しました。',
    'file' => ':attributeには、ファイル形式を指定してください。',
    'filled' => ':attributeは必須です。',
    'gt' => [
        'array' => ':attributeの項目数は、:value個より多い必要があります。',
        'file' => ':attributeは、:value KBより大きい必要があります。',
        'numeric' => ':attributeは、:valueより大きい必要があります。',
        'string' => ':attributeは、:value文字を超える必要があります。',
    ],
    'gte' => [
        'array' => ':attributeの項目数は、:value個以上である必要があります。',
        'file' => ':attributeは、:value KB以上である必要があります。',
        'numeric' => ':attributeは、:value以上である必要があります。',
        'string' => ':attributeは、:value文字以上である必要があります。',
    ],
    // 以下同様に json の内容をすべて PHP 配列に変換
    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],
    'attributes' => [],
];
