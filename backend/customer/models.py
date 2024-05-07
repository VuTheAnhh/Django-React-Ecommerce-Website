from django.db import models

class Student(models.Model):
    code = models.CharField(max_length=10, null=True, blank=True)
    full_name = models.CharField(max_length=100, default='anomynous')
    score1 = models.DecimalField(max_digits=3, decimal_places=1, default=0.00)
    score2 = models.DecimalField(max_digits=3, decimal_places=1, default=0.00)
    midterm = models.DecimalField(max_digits=3, decimal_places=1, default=0.00)
    final = models.DecimalField(max_digits=3, decimal_places=1, default=0.00)

    def __str__(self):
        return self.full_name
    @property
    def average(self):
        return round(((float(self.score1) + float(self.score2)) * 0.1 + float(self.midterm) * 0.2 + float(self.final) * 0.6), 1)


