<?php
/**
 * Created by PhpStorm.
 * User: guillaumesoullard1
 * Date: 23/02/2015
 * Time: 19:55
 */
namespace Decision\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Http\Response;
use Zend\View\Model\JsonModel;

use Decision\Entity\ItmDecision;
use Decision\Entity\ItmParameter;
use Decision\Entity\Test;

class CreationController extends AbstractActionController
{

    /**
     * @var Doctrine\ORM\EntityManager
     */
    protected $em;

    public function createAction()
    {
        return new ViewModel();
    }

    public function create2Action()
    {
        return new ViewModel();
    }

    public function getParameterDataAction(){

        $request = $this->getRequest();
        $parameterData = array(
            "parameterName" => $request->getPost('parameterName'),
            "parameterMinValue" => $request->getPost('parameterMinValue'),
            "parameterMaxValue" => $request->getPost('parameterMaxValue'),
            "parameterOrder" => $request->getPost('parameterOrder'),
            "parameterUnit" => $request->getPost('parameterUnit')
        );
        $response = new Response();
        $response->setContent(json_encode($parameterData));
        return $response;
    }

    public function decisionCreateAction()
    {

        $request = $this->getRequest();
        $decisionData = array(
            "decisionName" => $request->getPost('decisionName'),
            "parametersData" => $request->getPost('parametersData')
        );

        $em = $this->getEntityManager();

        $decision = new ItmDecision();
        $decision->setDecisionAuthorId("author");
        $decision->setDecisionName($decisionData['decisionName']);
        $decision->setDecisionCreattionDate("date de creation");

        $em->persist($decision);

        foreach ($decisionData['parametersData'] as $parameterData) {
            $parameter = new ItmParameter();
            $parameter->setParameterName($parameterData[0]);
            $parameter->setParameterMinValue($parameterData[1]);
            $parameter->setParameterMaxValue($parameterData[2]);
            $parameter->setParameterOrder($parameterData[3]);
            $parameter->setParameterUnit($parameterData[4]);
            $parameter->setParameterDecision($decision);
            $em->persist($parameter);
        }

        $em->flush();

        $response = new Response();
        $decisionId = $decision->getDecisionId();
        $response = json_encode($decisionId);
        return new JsonModel(array(
            'decisionId' => $decisionId,
        ));

    }

    public function getEntityManager() {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
        }
        return $this->em;
    }
}