# Generated by Django 4.2.9 on 2024-08-25 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("data", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="create_date",
        ),
        migrations.RemoveField(
            model_name="user",
            name="forname",
        ),
        migrations.RemoveField(
            model_name="user",
            name="lastname",
        ),
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(
                blank=True, max_length=254, verbose_name="email address"
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="password",
            field=models.CharField(max_length=128, verbose_name="password"),
        ),
    ]
