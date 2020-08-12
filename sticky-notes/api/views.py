from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

# Create your views here.

# Presents the available links for this API
@api_view(['GET'])
def apiOverview(request):
    api_links = {
        'List':'/note-list',
        'Detail':'/note-detail/<str:pk>/',
        'Create':'/note-create/',
        'Update':'/note-update/<str:pk>/',
        'Delete':'/note-delete/<str:pk>/',
    }
    return Response(api_links)

@api_view(['GET'])
def noteList(request):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def noteDetail(request, pk):
    try:
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)
    except Note.DoesNotExist:
        return HttpResponse(status=404)

@api_view(['POST'])
def noteCreate(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def noteUpdate(request, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def noteDelete(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Deleted')
    