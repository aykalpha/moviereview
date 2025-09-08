FROM php:8.2-fpm

WORKDIR /var/www/html

# Composer をコピー
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libpq-dev \
    libzip-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-configure zip \
    && docker-php-ext-install pdo pdo_pgsql pdo_mysql exif pcntl bcmath gd zip
