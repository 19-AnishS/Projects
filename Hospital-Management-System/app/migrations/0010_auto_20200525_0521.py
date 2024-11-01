# Generated by Django 3.0.5 on 2020-05-24 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_auto_20200525_0401'),
    ]

    operations = [
        migrations.RemoveField(model_name='appointment', name='message',),
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(
                choices=[('PD', 'Pending'), ('AP', 'Approved')],
                default='PD',
                max_length=2,
            ),
        ),
    ]
