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
     * @var \Decision\Entity\ItmDecision
     *
     * @ORM\ManyToOne(targetEntity="Decision\Entity\ItmDecision")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="parameter_decision_id", referencedColumnName="decision_id")
     * })
     */
    private $parameterDecision;



    /**
     * Get parameterId
     *
     * @return integer 
     */
    public function getParameterId()
    {
        return $this->parameterId;
    }

    /**
     * Set parameterName
     *
     * @param string $parameterName
     * @return ItmParameter
     */
    public function setParameterName($parameterName)
    {
        $this->parameterName = $parameterName;

        return $this;
    }

    /**
     * Get parameterName
     *
     * @return string 
     */
    public function getParameterName()
    {
        return $this->parameterName;
    }

    /**
     * Set parameterMinValue
     *
     * @param string $parameterMinValue
     * @return ItmParameter
     */
    public function setParameterMinValue($parameterMinValue)
    {
        $this->parameterMinValue = $parameterMinValue;

        return $this;
    }

    /**
     * Get parameterMinValue
     *
     * @return string 
     */
    public function getParameterMinValue()
    {
        return $this->parameterMinValue;
    }

    /**
     * Set parameterMaxValue
     *
     * @param string $parameterMaxValue
     * @return ItmParameter
     */
    public function setParameterMaxValue($parameterMaxValue)
    {
        $this->parameterMaxValue = $parameterMaxValue;

        return $this;
    }

    /**
     * Get parameterMaxValue
     *
     * @return string 
     */
    public function getParameterMaxValue()
    {
        return $this->parameterMaxValue;
    }

    /**
     * Set parameterUnit
     *
     * @param string $parameterUnit
     * @return ItmParameter
     */
    public function setParameterUnit($parameterUnit)
    {
        $this->parameterUnit = $parameterUnit;

        return $this;
    }

    /**
     * Get parameterUnit
     *
     * @return string 
     */
    public function getParameterUnit()
    {
        return $this->parameterUnit;
    }

    /**
     * Set parameterType
     *
     * @param string $parameterType
     * @return ItmParameter
     */
    public function setParameterType($parameterType)
    {
        $this->parameterType = $parameterType;

        return $this;
    }

    /**
     * Get parameterType
     *
     * @return string 
     */
    public function getParameterType()
    {
        return $this->parameterType;
    }

    /**
     * Set parameterDecision
     *
     * @param \Decision\Entity\ItmDecision $parameterDecision
     * @return ItmParameter
     */
    public function setParameterDecision(\Decision\Entity\ItmDecision $parameterDecision = null)
    {
        $this->parameterDecision = $parameterDecision;

        return $this;
    }

    /**
     * Get parameterDecision
     *
     * @return \Decision\Entity\ItmDecision 
     */
    public function getParameterDecision()
    {
        return $this->parameterDecision;
    }
}
