from django.db import models
from django.http import *


# Create your models here.





class AutoModel(models.Model):

    class Meta:
        ordering = ['name']
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    def __unicode__(self):
        return '%s' % (self.name)


    def resiveData(request):
        import logging
        if request.method == 'POST':
            tittle = request.POST.get('name','')
            p=AutoModel(name=tittle)
            p.save()
            logging.debug(tittle)
        return tittle


