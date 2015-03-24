<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

return array(
    'router' => array(
        'routes' => array(
            'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Decision\Controller\Index',
                        'action'     => 'index',
                    ),
                ),
            ),
            'index' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/index',
                    'defaults' => array(
                        'controller' => 'Decision\Controller\Index',
                        'action'     => 'index',
                    ),
                ),
            ),
            'create' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/create',
                    'defaults' => array(
                        'controller' => 'Decision\Controller\Creation',
                        'action'     => 'create',
                    ),
                ),
            ),
            'getParameterData' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/getParameterData',
                    'defaults' => array(
                        'controller' => 'Decision\Controller\Creation',
                        'action'     => 'getParameterData',
                    ),
                ),
            ),
            'decisionCreate' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/decision/create',
                    'defaults' => array(
                        'controller' => 'Decision\Controller\Creation',
                        'action'     => 'decisionCreate',
                    ),
                ),
            ),
            'table' => array(
                'type' => 'segment',
                'options' => array(
                    'route'    => '/table/[:id]',
                    'constraints' => array(
                        'id' => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Decision\Controller\Table',
                        'action'     => 'table',
                    ),
                ),
            ),
            /*'persistance' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/persistance',
                    'defaults' => array(
                        'controller' => 'Decision\Controller\Creation',
                        'action'     => 'persistance',
                    ),
                ),
            ),*/
            'charts' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/charts',
                    'defaults' => array(
                        'controller' => 'Decision\Controller\Charts',
                        'action'     => 'index',
                    ),
                ),
            ),
        ),
    ),
    'service_manager' => array(
        'abstract_factories' => array(
            'Zend\Cache\Service\StorageCacheAbstractServiceFactory',
            'Zend\Log\LoggerAbstractServiceFactory',
        ),
        'aliases' => array(
            'translator' => 'MvcTranslator',
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Decision\Controller\Index' => 'Decision\Controller\IndexController',
            'Decision\Controller\Creation' => 'Decision\Controller\CreationController',
            'Decision\Controller\Table' => 'Decision\Controller\TableController',
            'Decision\Controller\Charts' => 'Decision\Controller\ChartsController'
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'decision/index/index' => __DIR__ . '/../view/decision/index/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
        'strategies' => array(
            'ViewJsonStrategy',
        ),
    ),
    'doctrine' => array(
        'driver' => array(
            'entity_driver' => array(
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => array(__DIR__ . '/../src/Decision/Entity')
                //'paths' => array(__DIR__ . '/../src/' . __NAMESPACE__ . '/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    'Decision\Entity' =>  'entity_driver'
                ),
            ),
        ),
    ),
    // Placeholder for console routes
    'console' => array(
        'router' => array(
            'routes' => array(
            ),
        ),
    ),
);
