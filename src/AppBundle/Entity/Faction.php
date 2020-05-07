<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Faction
 *
 * @ORM\Table(name="ew_faction")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FactionRepository")
 */
class Faction {
    
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    
    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    protected $name;
    
    /**
     * @var string
     *
     * @ORM\Column(name="flagUrl", type="string", length=255)
     */
    protected $flagUrl;
    
    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Faction
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set flagUrl
     *
     * @param string $flagUrl
     *
     * @return Faction
     */
    public function setFlagUrl($flagUrl)
    {
        $this->flagUrl = $flagUrl;

        return $this;
    }

    /**
     * Get flagUrl
     *
     * @return string
     */
    public function getFlagUrl()
    {
        return $this->flagUrl;
    }
}
