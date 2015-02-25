<?php

return array(
    'doctrine' => array(
        'connection' => array(
            'orm_default' => array(
                'driverClass' => 'Doctrine\DBAL\Driver\PDOMySql\Driver',
                'params' => array(
                    'host' => '127.0.0.1',
                    'port' => '3306',
                    'user' => 'root',
                    'password' => 'root',
                    'dbname' => 'decisionhelper',
                    'charset' => 'UTF8',
                    'driverOptions' => array(
                        1002 => 'SET NAMES utf8'
                    )
                )
            ),
        ),
    )
);
