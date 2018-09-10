<?php
namespace AppBundle\Entity;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\ORM\Mapping as ORM;
/**
 * BlogUser
 *
 * @ORM\Table(name="blog_user", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_DC08CE2248CA3048", columns={"user_login"})})
 * @ORM\Entity
 */
class BlogUser implements UserInterface
{
    /**
     * @var string
     *
     * @ORM\Column(name="user_login", type="string", length=255, nullable=false)
     */
    private $userLogin;
    /**
     * @var string
     * @ORM\Column(name="user_name", type="string", length=127, nullable=false)
     */
    private $userName;
    /**
     * @var string
     *
     * @ORM\Column(name="user_email", type="string", length=127, nullable=false)
     */
    private $userEmail;
    /**
     * @var string
     *
     * @ORM\Column(name="user_password", type="string", length=127, nullable=false)
     */
    private $userPassword;
    /**
     * @var string
     *
     * @ORM\Column(name="api_token", type="string", length=127, nullable=false)
     */
    private $apiToken;
    /**
     * @var string
     *
     * @ORM\Column(name="user_type", type="text", nullable=false)
     */
    private $userType;
    /**
     * @var integer
     *
     * @ORM\Column(name="user_active", type="integer", nullable=false)
     */
    private $userActive;
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="user_date_add", type="datetime", nullable=false)
     */
    private $userDateAdd;
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="user_date_lastlogin", type="datetime", nullable=false)
     */
    private $userDateLastlogin;
    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $userId;
    /**
     * Set userLogin
     *
     * @param string $userLogin
     *
     * @return BlogUser
     */
    public function setUserLogin($userLogin)
    {
        $this->userLogin = $userLogin;
        return $this;
    }
    /**
     * Get userLogin
     *
     * @return string
     */
    public function getUserLogin()
    {
        return $this->userLogin;
    }
    /**
     * Set userName
     *
     * @param string $userName
     *
     * @return BlogUser
     */
    public function setUserName($userName)
    {
        $this->userName = $userName;
        return $this;
    }
    /**
     * Get userName
     *
     * @return string
     */
    public function getUserName()
    {
        return $this->userName;
    }
    /**
     * Set userEmail
     *
     * @param string $userEmail
     *
     * @return BlogUser
     */
    public function setUserEmail($userEmail)
    {
        $this->userEmail = $userEmail;
        return $this;
    }
    /**
     * Get userEmail
     *
     * @return string
     */
    public function getUserEmail()
    {
        return $this->userEmail;
    }
    /**
     * Set userPassword
     *
     * @param string $userPassword
     *
     * @return BlogUser
     */
    public function setUserPassword($userPassword)
    {
        $this->userPassword = $userPassword;
        return $this;
    }
    /**
     * Get userPassword
     *
     * @return string
     */
    public function getUserPassword()
    {
        return $this->userPassword;
    }
    /**
     * Set apiToken
     *
     * @param string $apiToken
     *
     * @return BlogUser
     */
    public function setApiToken($apiToken)
    {
        $this->apiToken = $apiToken;
        return $this;
    }
    /**
     * Get apiToken
     *
     * @return string
     */
    public function getApiToken()
    {
        return $this->apiToken;
    }
    /**
     * Set userType
     *
     * @param string $userType
     *
     * @return BlogUser
     */
    public function setUserType($userType)
    {
        $this->userType = $userType;
        return $this;
    }
    /**
     * Get userType
     *
     * @return string
     */
    public function getUserType()
    {
        return $this->userType;
    }
    /**
     * Set userActive
     *
     * @param integer $userActive
     *
     * @return BlogUser
     */
    public function setUserActive($userActive)
    {
        $this->userActive = $userActive;
        return $this;
    }
    /**
     * Get userActive
     *
     * @return integer
     */
    public function getUserActive()
    {
        return $this->userActive;
    }
    /**
     * Set userDateAdd
     *
     * @param \DateTime $userDateAdd
     *
     * @return BlogUser
     */
    public function setUserDateAdd($userDateAdd)
    {
        $this->userDateAdd = $userDateAdd;
        return $this;
    }
    /**
     * Get userDateAdd
     *
     * @return \DateTime
     */
    public function getUserDateAdd()
    {
        return $this->userDateAdd;
    }
    /**
     * Set userDateLastlogin
     *
     * @param \DateTime $userDateLastlogin
     *
     * @return BlogUser
     */
    public function setUserDateLastlogin($userDateLastlogin)
    {
        $this->userDateLastlogin = $userDateLastlogin;
        return $this;
    }
    /**
     * Get userDateLastlogin
     *
     * @return \DateTime
     */
    public function getUserDateLastlogin()
    {
        return $this->userDateLastlogin;
    }
    /**
     * Get userId
     *
     * @return integer
     */
    public function getUserId()
    {
        return $this->userId;
    }
    public function getRoles()
    {
        $roles[] = $this->userType;
        // guarantees that a user always has at least one role for security
        if (empty($roles)) {
            $roles[] = 'ROLE_USER';
        }
        return $roles;
    }
    public function getPassword()
    {
        return $this->userPassword;
    }
    public function getSalt()
    {
        return $this->userId;
    }
    public function eraseCredentials()
    {
        return $this->userId;
    }
}
