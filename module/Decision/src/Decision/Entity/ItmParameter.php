<?php

namespace Decision\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ItmParameter
 *
 * @ORM\Table(name="itm_parameter", indexes={@ORM\Index(name="parameter_decision_id_idx", columns={"parameter_decision_id"})})
 * @ORM\Entity
 */
class ItmParameter
{
    /**
     * @var integer
     *
     * @ORM\Column(name="parameter_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $parameterId;

    /**
     * @var string
     *
     * @ORM\Column(name="parameter_name", type="string", length=45, nullable=true)
     */
    private $parameterName;

    /**
     * @var string
     *
     * @ORM\Column(name="parameter_min_value", type="string", length=45, nullable=true)
     */
    private $parameterMinValue;

    /**
     * @var string
     *
     * @ORM\Column(name="parameter_max_value", type="string", length=45, nullable=true)
     */
    private $parameterMaxValue;

    /**
     * @var string
     *
     * @ORM\Column(name="parameter_unit", type="string", length=45, nullable=true)
     */
    private $parameterUnit;

    /**
     * @var string
     *
     * @ORM\Column(name="parameter_type", type="string", length=45, nullable=true)
     */
    private $parameterType;

    /**
     * @var integer
     *
     * @ORM\Column(name="parameter_order", type="integer", nullable=true)
     */
    private $parameterOrder;

    /**
     * @var \Decision\Entity\ItmDecision
     *
     * @ORM\ManyToOne(targetEntity="Decision\Entity\ItmDecision")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="parameter_decision_id", referencedColumnName="decision_id")
     * })
     */
    private $parameterDecision;

    /**
     * @return int
     */
    public function getParameterId()
    {
        return $this->parameterId;
    }

    /**
     * @param int $parameterId
     */
    public function setParameterId($parameterId)
    {
        $this->parameterId = $parameterId;
    }

    /**
     * @return string
     */
    public function getParameterName()
    {
        return $this->parameterName;
    }

    /**
     * @param string $parameterName
     */
    public function setParameterName($parameterName)
    {
        $this->parameterName = $parameterName;
    }

    /**
     * @return string
     */
    public function getParameterMinValue()
    {
        return $this->parameterMinValue;
    }

    /**
     * @param string $parameterMinValue
     */
    public function setParameterMinValue($parameterMinValue)
    {
        $this->parameterMinValue = $parameterMinValue;
    }

    /**
     * @return string
     */
    public function getParameterMaxValue()
    {
        return $this->parameterMaxValue;
    }

    /**
     * @param string $parameterMaxValue
     */
    public function setParameterMaxValue($parameterMaxValue)
    {
        $this->parameterMaxValue = $parameterMaxValue;
    }

    /**
     * @return string
     */
    public function getParameterUnit()
    {
        return $this->parameterUnit;
    }

    /**
     * @param string $parameterUnit
     */
    public function setParameterUnit($parameterUnit)
    {
        $this->parameterUnit = $parameterUnit;
    }

    /**
     * @return string
     */
    public function getParameterType()
    {
        return $this->parameterType;
    }

    /**
     * @param string $parameterType
     */
    public function setParameterType($parameterType)
    {
        $this->parameterType = $parameterType;
    }

    /**
     * @return int
     */
    public function getParameterOrder()
    {
        return $this->parameterOrder;
    }

    /**
     * @param int $parameterOrder
     */
    public function setParameterOrder($parameterOrder)
    {
        $this->parameterOrder = $parameterOrder;
    }

    /**
     * @return \Decision\Entity\ItmDecision
     */
    public function getParameterDecision()
    {
        return $this->parameterDecision;
    }

    /**
     * @param \Decision\Entity\ItmDecision $parameterDecision
     */
    public function setParameterDecision($parameterDecision)
    {
        $this->parameterDecision = $parameterDecision;
    }



}
