from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Custom manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, role, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        if not first_name:
            raise ValueError('First name is required')
        if not last_name:
            raise ValueError('Last name is required')
        if not role:
            raise ValueError('Role is required')

        # Enforce required fields by role
        if role == 'student' and not extra_fields.get('matric_number'):
            raise ValueError('Matric number is required for students.')
        if role == 'supervisor' and not extra_fields.get('title'):
            raise ValueError('Title is required for supervisors.')

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=role,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('role', 'admin')  # use admin for superuser
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        # title can be blank for admin

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
            #sodeinfayeee@gmail.com+queen123 as password

        return self.create_user(email, first_name, last_name, password=password, **extra_fields)

# Main user model
class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('supervisor', 'Supervisor'),
        ('admin', 'Admin'),
    )

    TITLE_CHOICES = (
        ('professor', 'Professor'),
        ('doctor', 'Doctor'),
        ('mr_mrs', 'Mr/Mrs'),
    )

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    # Only for supervisors
    title = models.CharField(max_length=20, choices=TITLE_CHOICES, blank=True, null=True)

    # Only for students
    matric_number = models.CharField(max_length=100, blank=True, null=True, unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email
